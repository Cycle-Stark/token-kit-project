import { Button } from "@mantine/core"
import { IconCurrencyDollar } from "@tabler/icons-react"
import { useState } from "react"
import { SelectTokenModal, IToken } from "tokenkit"

const SelectToken = () => {
    const [token, setToken] = useState<IToken>()
    return (
        <div>
            <SelectTokenModal selectedToken={token} callBackFunc={setToken} themeObject={{
                textColor: "white",
                modalBackground: "#11052d",
                headerFooterBackground: "rgba(0, 0, 0, 0.1)",
                tokenBackgroundColor: 'rgba(0, 0, 0, 0.1)',
                tokenHoverColor: 'rgba(0, 0, 0, 0.5)',
                searchBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                searchBorderColor: '#3d1698'
                // headerFooterBackground: "red"
            }}>
                <Button radius={'md'} leftSection={<IconCurrencyDollar size={'18px'} />}>
                    {
                        token ? token?.name : 'Select Token'
                    }
                </Button>
            </SelectTokenModal>
        </div>
    )
}

export default SelectToken