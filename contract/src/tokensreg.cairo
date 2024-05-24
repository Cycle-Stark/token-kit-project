use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[starknet::contract]
mod TokenReg {
    use tokenreg::erc20::IERC20DispatcherTrait;
    use tokenreg::models::{ContractAddress, Token, Admin};
    use tokenreg::interface::{ITokenReg, IInternal};
    use core::array::ArrayTrait;
    use tokenreg::erc20::{IERC20Dispatcher};
    use starknet::{get_caller_address, ClassHash, get_contract_address};
    use tokenreg::upgrade::{IUpgradeableContract};
    use starknet::SyscallResultTrait;
    use core::{zeroable, zeroable::{NonZero, Zeroable}};

    #[storage]
    struct Storage {
        tokens: LegacyMap<u256, Token>,
        tokens_count: u256,
        guardian: ContractAddress,
        admins: LegacyMap<ContractAddress, bool>,
        admins_store: LegacyMap<u8, Admin>,
        admins_count: u8,
        version: u8,
        tokens_version: u64,
        fee_token: ContractAddress,
        verification_fee: u256,
        revenue: u256
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        Upgraded: Upgraded
    }

    #[derive(Drop, starknet::Event)]
    struct Upgraded {
        implementation: ClassHash
    }

    #[constructor]
    fn constructor(ref self: ContractState, guardian: ContractAddress) {
        self.guardian.write(guardian);
    }

    #[generate_trait]
    impl Private of PrivateTrait {
        fn update_tokens_version(ref self: ContractState) {
            self.tokens_version.write(self.tokens_version.read() + 1)
        }

        fn assert_is_guardian(self: @ContractState) {
            let caller = get_caller_address();

            assert(self.guardian.read() == caller, 'Guardian Only');
        }

        fn assert_is_guardian_or_admin(self: @ContractState) {
            let caller = get_caller_address();
            let available = self.admins.read(caller);

            assert(self.guardian.read() == caller || !available, 'Guardian/Admin Only');
        }
    }


    #[abi(embed_v0)]
    impl TokenRegImpl of ITokenReg<ContractState> {
        fn add_token(ref self: ContractState, address: ContractAddress, icon_link: felt252) {
            let token_id = self.tokens_count.read() + 1;
            let token: IERC20Dispatcher = IERC20Dispatcher { contract_address: address };
            let token_symbol = token.symbol();
            let token_decimals = token.decimals();
            let token_name = token.name();

            let token = Token {
                address,
                name: token_name,
                symbol: token_symbol,
                decimals: token_decimals,
                verified: false,
                public: true,
                common: false,
                icon: icon_link
            };

            self.tokens.write(token_id, token);
            self.tokens_count.write(token_id);
            self.update_tokens_version();
        }

        // fn verif
        fn edit_token(
            ref self: ContractState,
            token_index: u256,
            public: bool,
            verified: bool,
            common: bool,
            icon_link: felt252
        ) {
            self.assert_is_guardian_or_admin();
            let token = self.tokens.read(token_index);

            let token = Token {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                verified: verified,
                public: public,
                icon: icon_link,
                common
            };

            self.tokens.write(token_index, token);
            self.update_tokens_version();
        }
        fn add_admin(ref self: ContractState, address: ContractAddress) {
            // Only guardians can add admins
            self.assert_is_guardian();
            self.admins.write(address, true);
            let admin_id = self.admins_count.read() + 1;
            self.admins_count.write(admin_id);
            let admin = Admin { address: address, amount: 0, };
            self.admins_store.write(admin_id, admin);
        }
        fn get_admins(self: @ContractState,) -> Array<Admin> {
            let mut admins = ArrayTrait::<Admin>::new();
            let admin_count = self.admins_count.read();

            // Add guardian to admins
            let guardian_admin = Admin { address: self.guardian.read(), amount: 0 };
            admins.append(guardian_admin);

            let mut count = 1;
            loop {
                if admin_count > 0 && count <= admin_count {
                    let admin = self.admins_store.read(count);
                    admins.append(admin);
                } else {
                    break;
                }
                count += 1;
            };
            admins
        }

        fn get_tokens(self: @ContractState, page: u256) -> Array<Token> {
            assert(page > 0, 'Page Cant be less than 1');
            let mut tokens = ArrayTrait::<Token>::new();
            let total_count = self.tokens_count.read();
            let pagesize = 25;

            if total_count > 0 {
                let start_index = (page - 1) * pagesize + 1;
                let mut count = start_index;

                loop {
                    if count > total_count || count > start_index + pagesize - 1 {
                        break;
                    }
                    tokens.append(self.tokens.read(count));
                    count += 1;
                }
            }

            tokens
        }

        fn get_tokens_count(self: @ContractState) -> u256 {
            self.tokens_count.read()
        }

        fn get_has_upgraded(self: @ContractState) -> felt252 {
            let _version = self.version.read();
            'we just upgraded'
        }

        fn get_tokens_version(self: @ContractState) -> u64 {
            self.tokens_version.read()
        }

        fn verify_token(ref self: ContractState, token_index: u256) {
            let caller = get_caller_address();

            let token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: self.fee_token.read()
            };

            let are_tokens_transfered = token
                .transferFrom(caller, get_contract_address(), self.verification_fee.read());

            if are_tokens_transfered {
                let token = self.tokens.read(token_index);

                let token = Token {
                    address: token.address,
                    name: token.name,
                    symbol: token.symbol,
                    decimals: token.decimals,
                    verified: true,
                    public: token.public,
                    icon: token.icon,
                    common: token.common
                };

                self.tokens.write(token_index, token);
                self.update_tokens_version();
                self.revenue.write(self.revenue.read() + self.verification_fee.read())
            }
        }
        fn withdraw_token(ref self: ContractState, receiver: ContractAddress, amount: u256) {
            let token: IERC20Dispatcher = IERC20Dispatcher {
                contract_address: self.fee_token.read()
            };
            let _are_tokens_transfered = token.transfer(receiver, amount);
        }
    }

    #[abi(embed_v0)]
    impl InternalImpl of IInternal<ContractState> {
        fn edit_fee_token(ref self: ContractState, token_address: ContractAddress) {
            self.assert_is_guardian();
            self.fee_token.write(token_address);
        }
        fn edit_verification_fee(ref self: ContractState, fee: u256) {
            self.assert_is_guardian();
            self.verification_fee.write(fee);
        }
        fn get_revenue(self: @ContractState) -> u256 {
            self.assert_is_guardian_or_admin();
            self.revenue.read()
        }
    }

    #[abi(embed_v0)]
    impl UpgradeableContract of IUpgradeableContract<ContractState> {
        fn upgrade(ref self: ContractState, impl_hash: ClassHash) {
            assert(!impl_hash.is_zero(), 'Class hash cannot be zero');
            self.assert_is_guardian();
            starknet::replace_class_syscall(impl_hash).unwrap_syscall();
            self.version.write(self.version.read() + 1);
            self.emit(Event::Upgraded(Upgraded { implementation: impl_hash }))
        }

        fn version(self: @ContractState) -> u8 {
            self.version.read()
        }
    }
}

