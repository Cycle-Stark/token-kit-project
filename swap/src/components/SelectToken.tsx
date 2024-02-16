import { Avatar, Box, Group, Stack, Text } from "@mantine/core"
import { SelectTokenModal, IToken, limitChars } from "starknet-tokenkit"

interface ISelectToken {
    token: IToken | any
    setTokenFn: any
    fieldname: string
}

const SelectToken = (props: ISelectToken) => {
    const { token, setTokenFn, fieldname } = props

    const callBackFn = (token: IToken) => {
        setTokenFn(fieldname, token)
    }

    return (
        <div>
            <SelectTokenModal selectedToken={token} callBackFunc={callBackFn} themeObject={{
                textColor: "white",
                modalBackground: "#11052d",
                headerFooterBackground: "rgba(0, 0, 0, 0.1)",
                tokenBackgroundColor: 'rgba(0, 0, 0, 0.1)',
                tokenHoverColor: 'rgba(0, 0, 0, 0.5)',
                searchBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                searchTextColor: 'white',
                searchBorderColor: '#3d1698'
            }}>
                <Box p={'sm'} style={theme => ({
                    background: 'rgba(0, 0, 0, 0.4)',
                    borderRadius: theme.radius.xl,
                    cursor: 'pointer'
                })}>
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
            </SelectTokenModal>
        </div>
    )
}

export default SelectToken