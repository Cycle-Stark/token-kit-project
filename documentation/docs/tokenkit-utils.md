---
sidebar_position: 7
title: "Tokenkit Utils"
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
```

## BigInt to Address (ContractAddress)

This takes in an address in BigInt format and converts it to an address.

```tsx
bigintToLongAddress(val: bigIntAddress)
```

## BigInt to Short String (Felt252)

This takes in those fields you saved as felt252s, this means like short strings. It will convert it to a readable string.

```tsx
bigintToShortStr(val: felt252)
```


## Limit Characters 

This method helps in shortening a string to a given number of characters and whether you want it to have those 3 dots or not.

```tsx
limitChars(val: string, charsCount: number, has_dots: boolean)
```


## Convert tokens to readable tokens

This method takes in  the tokens count (Usually a large number) and the decimals for that token and returns a readable token number.

```tsx
convertToReadableTokens(tokens: number|string, decimals: number)
```

Example

```tsx
const USDC_5 = 5000000
const decimals = 6

/*
    We know USDC token has 6 decimals, the above method will help return 5
*/

const readable_value = convertToReadableTokens(USDC_5, decimals)

/*
    Therefore, readable_value is equal to 5
*/

```