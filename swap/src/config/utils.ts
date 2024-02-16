import erc20bi from '../assets/erc20abi.json'

export const ERC20_ABI = erc20bi

export function formatNumber(_num: number | string) {
    let num: number = Number(_num)
    // Check if the input is a valid number
    if (isNaN(num)) {
        return "0.0000";
    }

    // Use Intl.NumberFormat to format the number with commas
    var formatter = new Intl.NumberFormat('en-US');
    return formatter.format(num);
}