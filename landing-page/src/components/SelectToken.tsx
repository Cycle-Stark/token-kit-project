import { Avatar, Box, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { SelectTokenModal, IToken, limitChars, IModalThemeObject, } from "starknet-tokenkit"

interface ISelectToken {
    themeObj?: IModalThemeObject
}

const SelectToken = ({ themeObj }: ISelectToken) => {
    const [token, setToken] = useState<IToken>()
    
    const defaultThemeObj = {
        textColor: "white",
        modalBackground: "#11052d",
        headerFooterBackground: "rgba(0, 0, 0, 0.1)",
        tokenBackgroundColor: 'rgba(0, 0, 0, 0.1)',
        tokenHoverColor: 'rgba(0, 0, 0, 0.5)',
        searchBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        searchTextColor: 'white',
        searchBorderColor: '#3d1698'
    }

    return (
        <div>
            <SelectTokenModal selectedToken={token} callBackFunc={setToken} themeObject={themeObj ?? defaultThemeObj}>
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
            </SelectTokenModal>
        </div>
    )
}

export default SelectToken

