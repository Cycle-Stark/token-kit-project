import { Avatar, Box, Group, Stack, Text } from "@mantine/core"
import { useState } from "react"
import { SelectTokenModal, IToken, limitChars } from "starknet-tokenkit"

interface ISelectToken {
    themeObj?: any
}

const SelectToken = ({ themeObj }: ISelectToken) => {
    const [token, setToken] = useState<IToken>()
    // const theme = useMantineTheme()

    // const defaultThemeObj = {
    //     textColor: 'white',
    //     headerFooterBg: "rgba(0, 0, 0, 0.28)",
    //     backgroundColor: "rgba(32, 6, 87, 1)",
    //     fontFamily: "Space Grotesk, sans-serif",
    //     searchBackground: "rgba(0, 0, 0, 0.51)",
    //     searchColor: 'white',
    //     searchBorderColor: 'rgba(14, 6, 46, 0)',
    //     searchFocusBorderColor: theme.colors.violet[5],
    //     primaryColor: "yellow",
    // }

    // const defaultThemeObj = {
    //     textColor: 'black',
    //     headerFooterBg: "rgba(0, 0, 0, 0.1)",
    //     backgroundColor: "white",
    //     fontFamily: "Space Grotesk, sans-serif",
    //     searchBackground: "rgba(0, 0, 0, 0.1)",
    //     searchColor: 'black',
    //     searchBorderColor: 'rgba(14, 6, 46, 0)',
    //     searchFocusBorderColor: theme.colors.violet[5],
    //     primaryColor: theme.colors.violet[5],
    // }


    const defaultThemeObj = {
        "textColor": "white",
        "headerFooterBg": "rgba(0, 0, 0, 0.28)",
        "backgroundColor": "#10b793",
        "fontFamily": "Space Grotesk, sans-serif",
        "searchBackground": "rgba(151, 244, 238, 0.46)",
        "searchColor": "white",
        "searchBorderColor": "rgba(14, 6, 46, 0)",
        "searchFocusBorderColor": "rgba(151, 244, 238, 1)",
        "primaryColor": "rgba(74, 0, 62, 1)"
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
        </div >
    )
}

export default SelectToken

