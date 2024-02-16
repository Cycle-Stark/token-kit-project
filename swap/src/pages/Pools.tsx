import { Container, Stack, Text, Title } from "@mantine/core"
import { useEffect, useState } from "react"
import axios from 'axios'
import { DataTable } from 'mantine-datatable'
import { limitChars } from "starknet-tokenkit"
import ContractInfo from "../components/pools/ContractInfo"

// {
//     "key_hash": "0x316eb42a44a40a7c3573b6320f72e34777e6b13ac9a13d50c5deb8a713c0e1d",
//     "token0": "0x4718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
//     "token1": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
//     "fee": "0x20c49ba5e353f80000000000000000",
//     "tick_spacing": 1000,
//     "extension": "0x0",
//     "sqrt_ratio": "0x133013283905ff5028339189109a874b3",
//     "tick": 363371,
//     "liquidity": "5102904082014394671",
//     "lastUpdate": {
//         "event_id": "4085158145359875"
//     }
// }


const Pools = () => {
    const [pools, setPools] = useState<any>([])
    const loadPools = () => {
        const endpoint = "https://goerli-api.ekubo.org/pools"
        axios.get(endpoint).then((res: any) => {
            console.log(res.data)
            setPools(res.data)
        }).catch((err: any) => {
            console.log(err)
        })
    }



    useEffect(() => {
        loadPools()
    }, [])
    return (
        <Container size={"md"}>
            <Stack>
                <Title>Pools</Title>
                <DataTable withTableBorder={false} records={pools} borderRadius={'lg'} verticalSpacing={'lg'} columns={[
                    {
                        accessor: 'token0',
                        title: 'Token 0',
                        width: '300px',
                        render: (item: any) => (
                            <Text>{limitChars(item.token0, 10, true)}</Text>
                        )
                    },
                    {
                        accessor: 'token1',
                        title: 'Token 1',
                        width: '300px',
                        render: (item: any) => (
                            <ContractInfo address={item.token0} />
                        )
                    },
                    {
                        accessor: 'extension',
                        title: 'Extension',
                        width: '300px',
                        render: (item: any) => (
                            <Text>{limitChars(item?.extension, 10, true)}</Text>
                        )
                    },
                ]} />
            </Stack>
        </Container>
    )
}

export default Pools