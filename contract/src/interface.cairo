use starknet::ContractAddress;
use starknet::class_hash::ClassHash;
use tokenreg::models::Token;
use tokenreg::models::Admin;
#[starknet::interface]
trait ITokenReg<TContractState> {
    fn add_token(
        ref self: TContractState, address: ContractAddress, icon_link: felt252
    );
    fn edit_token(
        ref self: TContractState,
        token_index: u256,
        public: bool,
        verified: bool,
        common: bool,
        icon_link: felt252
    );
    fn add_admin(ref self: TContractState, address: ContractAddress);
    fn get_tokens(self: @TContractState, page: u256) -> Array<Token>;
    fn get_admins(self: @TContractState, ) -> Array<Admin>;
    fn get_tokens_count(self: @TContractState) -> u256;
    fn get_has_upgraded(self: @TContractState) -> felt252;
    fn get_tokens_version(self: @TContractState) -> u64;
    fn verify_token(ref self: TContractState, token_index: u256);
    fn withdraw_token(ref self: TContractState, receiver: ContractAddress, amount: u256);
}


#[starknet::interface]
trait IInternal<TContractState> {
    fn edit_fee_token(ref self: TContractState, token_address: ContractAddress);
    fn edit_verification_fee(ref self: TContractState, fee: u256);
    fn get_revenue(self: @TContractState) -> u256;
}
