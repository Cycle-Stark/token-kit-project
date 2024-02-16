import { useEffect, useState } from 'react'
import { limitChars } from 'starknet-tokenkit'
import { Stack, Text } from '@mantine/core'

interface IContractInfo {
    address: string
}
const ContractInfo = (props: IContractInfo) => {
    const { address } = props
    const [info, _setInfo] = useState<any>(null)

    const loadTokenInfo = () => {
        // try {
        //     const ERC20contract = new Contract(ERC20_ABI, address)
        //     const provider = new RpcProvider({ nodeUrl: 'https://starknet-goerli.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec' })
        //     const erc20Call = ERC20contract.populate('get_name', [])
        //     const erc20Call1 = ERC20contract.populate('get_symbol', [])

        //     const _name = provider.callContract(erc20Call)
        //     const _symbol = provider.callContract(erc20Call1)
        //     setInfo({
        //         name: _name,
        //         symbol: _symbol
        //     })
        // }
        // catch (err: any) {

        // }
    }

    useEffect(() => {
        loadTokenInfo()
    }, [])

    return (
        <div>
            {
                info ? (
                    <Stack gap={0}>
                        <Text>{info?.name}</Text>
                        <Text>{info?.symbol}</Text>
                    </Stack>
                ) : <Text>{limitChars(address, 10, true)}</Text>
            }
        </div>
    )
}

export default ContractInfo