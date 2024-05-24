import { BigNumber } from 'bignumber.js'
import token_kit_abi from '../assets/token_kit_abi.json'
import { shortString } from 'starknet'

import erc20abi from '../assets/ERC_20_ABI.json'



export const TOKEN_KIT_ABI = token_kit_abi
export const TOKEN_KIT_CONTRACT_ADDRESS_TESTNET = "0x43bb576fa2a312a56e81d7e1ae2fb2a500895e670155209daf13c4d3a3c434e"
export const TOKEN_KIT_CONTRACT_ADDRESS_MAINNET = "0x01aeadb1baa972250f9d3dea67a12407439ecd30e6c68d78f34569f8a8009f17"

export const PRAGMA_CONTRACT_ADDRESS_TESTNET = "0x06df335982dddce41008e4c03f2546fa27276567b5274c7d0c1262f3c2b5d167"	
export const PRAGMA_CONTRACT_ADDRESS_MAINNET = "0x2a85bd616f912537c50a49a4076db02c00b29b2cdc8a197ce92ed1837fa875b"	

export const ERC20_ABI = erc20abi
export const USDC_ADDRESS_TESTNET = "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
export const USDC_ADDRESS_MAINNET = "0x053C91253BC9682c04929cA02ED00b3E423f6710D2ee7e0D5EBB06F3eCF368A8"

export function isDarkMode(colorscheme: any): boolean {
    return colorscheme === 'dark' ? true : false
}

export function formatNumberInternational(number: number) {
    const DECIMALS = 4
    if (typeof Intl.NumberFormat === 'function') {
        const formatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: DECIMALS, maximumFractionDigits: DECIMALS });
        return formatter.format(number);
    } else {
        console.warn('Intl.NumberFormat is not supported in this browser. Fallback may not provide accurate formatting.');
        return number.toLocaleString('en-US');
    }
}

export function bigintToShortStr(bigintstr: string) {
    try {
        if (!bigintstr) return ""
        const bn = BigNumber(bigintstr)
        const hex_sentence = `0x` + bn.toString(16)
        return shortString.decodeShortString(hex_sentence)
    }
    catch (error) {
        return bigintstr
    }
}

export function bigintToLongAddress(bigintstr: string) {
    try {
        if (!bigintstr) return ""
        const bn = BigNumber(bigintstr)
        const hex_sentence = `0x` + bn.toString(16)
        return hex_sentence;
    }
    catch (error) {
        return bigintstr
    }
}

export function convertToReadableTokens(tokens: any, decimals: number) {
    if (!tokens || !decimals) return ""
    return new BigNumber(tokens).dividedBy(10 ** decimals).toNumber().toFixed(6)
}

export const removeTrailingZeros = (tokenAddress: string): string => {
    if (tokenAddress.length > 4) {
        const res = '0x' + tokenAddress.substring(2).replace(/^0+/, "");
        return res
    }
    return tokenAddress
};

export function limitChars(str: string, count: number, show_dots: boolean) {
    if (count <= str?.length) {
        return `${str.substring(0, count)} ${show_dots ? '...' : ''}`
    }
    return str
}


export function timeStampToDate(timestamp: number) {
    if (!timestamp) return null
    const timestampInMilliseconds = timestamp * 1000;
    const date = new Date(timestampInMilliseconds);
    return date;
}

export function getRealPrice(val: any) {
    let decimals = BigNumber(val.decimals).toNumber()
    let ts = BigNumber(val.last_updated_timestamp).toNumber()
    let real_price = {
        price: BigNumber(val.price).dividedBy(10 ** decimals).toNumber(),
        last_updated_timestamp: timeStampToDate(ts),
        num_sources_aggregated: BigNumber(val.num_sources_aggregated).toNumber()
    }
    return real_price
}

