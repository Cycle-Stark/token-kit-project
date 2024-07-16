import { Avatar, Box, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { SelectTokenModal, IToken, limitChars } from "starknet-tokenkit"

interface ISelectToken {
    themeObj?: any
}

export const TokenPreviewComponent = ({ token }: { token?: IToken }) => {

    return (
        <Box p={'sm'} style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '10px',
            cursor: 'pointer'
        }}>
            <Group gap={6} align="center">
                <Avatar src={token?.icon}>
                    {limitChars(token?.symbol ?? 'ST', 2, false)}
                </Avatar>
                {
                    token ? (
                        <Stack gap={2}>
                            <Text size="sm" fw={500}>{token?.name}</Text>
                            <Text size="xs">{token?.symbol}</Text>
                        </Stack>
                    ) : <Text>Select Token</Text>
                }
            </Group>
        </Box>
    )
}

const SelectToken = ({ }: ISelectToken) => {
    const [token, setToken] = useState<IToken>()

    return (
        <div>
            <SelectTokenModal
                selectedToken={token} callBackFunc={setToken} animation="bounce">
                <TokenPreviewComponent token={token} />
            </SelectTokenModal>
        </div >
    )
}

export default SelectToken

