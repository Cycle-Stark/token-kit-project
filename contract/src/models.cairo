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
}




#[derive(Copy, Serde, Drop, starknet::Store)]
struct Admin {
    address: ContractAddress,
    amount :u256
}
