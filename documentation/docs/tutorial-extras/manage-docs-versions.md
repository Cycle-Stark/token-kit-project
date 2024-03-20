---
sidebar_position: 1
---

# TokenKit Extras!

This package also provides  other few functions that can be used in differente scenarios ie 

```ts
import { 
    bigintToLongAddress,
    bigintToShortStr,
    limitChars,
    convertToReadableTokens,
} from 'starknet-tokenkit'

bigintToLongAddress(val: bigIntAddress) - This takes in an address in BigInt format and converts it to an address.

bigintToShortStr(val: felt252) - This takes in those fields you saved as felt252s, this means like short strings. It will convert it to a readable string.

limitChars(val: string, charsCount: number, has_dots: boolean) - This method helps in shortening a string to a given number of characters and whether you want it to have those 3 dots or not.

convertToReadableTokens(tokens: number|string, decimals: number) - This method takes in  the tokens count and the decimals for that token and returns a readable token number.

```