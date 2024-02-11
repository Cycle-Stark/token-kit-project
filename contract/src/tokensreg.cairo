use starknet::ContractAddress;
use starknet::class_hash::ClassHash;

#[derive(Copy, Serde, Drop, starknet::Store)]
struct Token {
    address: ContractAddress,
    icon: felt252,
    name: felt252,
    symbol: felt252,
    decimals: u8,
    verified: bool,
    public: bool,
    common: bool,
    pair_id: felt252,
}

#[starknet::interface]
trait ITokenReg<TContractState> {
    fn add_token(ref self: TContractState, address: ContractAddress, icon_link: felt252, pair_id: felt252);
    fn edit_token(
        ref self: TContractState,
        token_index: u256,
        public: bool,
        verified: bool,
        common: bool,
        icon_link: felt252,
        pair_id: felt252
    );
    fn add_admin(ref self: TContractState, address: ContractAddress);
    fn get_tokens(self: @TContractState, page: u256) -> Array<Token>;
    fn get_tokens_count(self: @TContractState) -> u256;
    fn get_has_upgraded(self: @TContractState) -> felt252;
}


#[starknet::contract]
mod TokenReg {
    use tokenreg::erc20::IERC20DispatcherTrait;
    use super::{ITokenReg, ContractAddress, Token};
    use core::array::ArrayTrait;
    use tokenreg::erc20::{IERC20Dispatcher};
    use starknet::{get_caller_address, ClassHash};
    use tokenreg::upgrade::{IUpgradeableContract};
    use starknet::SyscallResultTrait;
    use core::{zeroable, zeroable::{NonZero, Zeroable}};

    #[storage]
    struct Storage {
        tokens: LegacyMap<u256, Token>,
        tokens_count: u256,
        guardian: ContractAddress,
        admins: LegacyMap<ContractAddress, bool>,
        version: u8
        
    }

    #[constructor]
    fn constructor(ref self: ContractState, guardian: ContractAddress) {
        self.guardian.write(guardian);
    }

    #[abi(embed_v0)]
    impl TokenRegImpl of ITokenReg<ContractState> {
        fn add_token(ref self: ContractState, address: ContractAddress, icon_link: felt252, pair_id: felt252) {
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
                icon: icon_link,
                pair_id
            };

            self.tokens.write(token_id, token);
            self.tokens_count.write(token_id);
        }
        fn edit_token(
            ref self: ContractState,
            token_index: u256,
            public: bool,
            verified: bool,
            common: bool,
            icon_link: felt252,
            pair_id: felt252
        ) {
            let caller = get_caller_address();
            let available = self.admins.read(caller);

            assert(self.guardian.read() == caller || available == true, 'You are not allowed');

            let token = self.tokens.read(token_index);

            let token = Token {
                address: token.address,
                name: token.name,
                symbol: token.symbol,
                decimals: token.decimals,
                verified: verified,
                public: public,
                icon: icon_link,
                common,
                pair_id
            };

            self.tokens.write(token_index, token);
        }
        fn add_admin(ref self: ContractState, address: ContractAddress) {
            let caller = get_caller_address();
            let available = self.admins.read(caller);
            assert(self.guardian.read() == caller || available == true, 'You are not allowed');
            self.admins.write(address, true);
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
        
        fn get_tokens_count(self: @ContractState) -> u256{
            self.tokens_count.read()
        }
         fn get_has_upgraded(self: @ContractState) -> felt252{
            let _version =  self.version.read();
            'we just upgraded'
         }
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

    #[abi(embed_v0)]
    impl UpgradeableContract of IUpgradeableContract<ContractState> {
        fn upgrade(ref self: ContractState, impl_hash: ClassHash) {
            assert(!impl_hash.is_zero(), 'Class hash cannot be zero');
            starknet::replace_class_syscall(impl_hash).unwrap_syscall();
            self.version.write(self.version.read() +1);
            self.emit(Event::Upgraded(Upgraded { implementation: impl_hash }))
        }

        fn version(self: @ContractState) -> u8 {
            self.version.read()
        }
    }


}
