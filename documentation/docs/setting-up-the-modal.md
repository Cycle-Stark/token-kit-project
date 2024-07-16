---
sidebar_position: 3
title: "Setting up Tokens Modal"
---

# Setting up Tokens Modal
 
## Custom token preview component

Create a preview component or a component that can be wrapped with the token modal. This component will help show the selected token and also it will act as a button to open the modal.

```tsx
import { Box, Group, Avatar, Stack, Text } from "@mantine/core"
import { IToken, limitChars } from "starknet-tokenkit"

// This can be any component, just a component to be wrapped with `SelectTokenModal` Component
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
```

## Create the Select Token component

Create a select token component to be put as a child of Tokenkit wrapper. Since Tokenkit wrapper wraps your entire app, you can simply use the component below in any page.

Make the component reusable so you don't have to create different components to achieve the same. That is, you can move the call back function and selectedToken as props and therefore you can reuse the component with a different token and call back function.

```tsx
import { SelectTokenModal, IToken } from "starknet-tokenkit"
import { useState } from "react"

/*

@params
selectedToken - This is the selected token for this particular component. It can be null or undefined.

callBackFunc - a callback function that will be called once one clicks ona given token. 
    This callback function takes in IToken(token). ie `function myCallbackFunc = (token: IToken) => {* Perforom your logic here *}`
    
modalHeight - default 90dvh - Not required, 
*/

const SelectToken = () => {
    const [token, setToken] = useState<IToken>()
    return (
        <div>
            <SelectTokenModal 
                selectedToken={token} 
                callBackFunc={setToken} 
                animation={'fade'} // Optional - Default 'fade', Options: 'bounce' | 'slide' | 'ease' | 'fade'
            >
                <MyCustomTokenPreviewComponent token={token} />
            </SelectTokenModal>
        </div>
    )
}
export default SelectToken
```





