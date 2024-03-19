
# Starknet Tokenkit
[![npm downloads](https://img.shields.io/npm/dt/starknet-tokenkit)](https://www.npmjs.com/package/starknet-tokenkit)

Starknet Tokenkit is a package that provides quick access to tokens in a modal format or you can interact with the contract to read the different tokens using the contract address and the abi.


Also you can add your own token by visiting the landing page: [Tokenkit](https://tokenkit-gamma.vercel.app)

---
- This is tested on React.
---

## Linking the Tokenkit Wrapper
To use Tokenkit, its pretty easy, first you import the `TokenKitWrapper` and wrap your entire app with it.

```tsx
import { TokenKitWrapper } from 'starknet-tokenkit'


/*
@params
usingMantine - Whether you are using Mantine UI or not. If you are using mantine, set this to `true` else `false`
primaryColor - This is the color for buttons on the modal and other components. Pick a color that atleast matches your overal theme. This will be overriden if you are using Mantine UI and you have set a primary color. Options are: 'blue' | 'cyan' | 'dark' | 'grape' | 'gray' | 'green' | 'indigo' | 'lime' | 'orange' | 'pink' | 'red' | 'teal' | 'violet' | 'yellow'
colorScheme - 'dark' | 'light'
network: 'SN_MAIN' | 'SN_GOERLI' -> SN_GOERLI is the only supported currently
nodeUrl: string
*/

const App = (props: any) => {
    const { children } = props
    return (
        <TokenKitWrapper usingMantine={true} primaryColor='violet' theme='dark' network="SN_GOERLI" nodeUrl="<GET_ONE_FROM_INFRA_OR_ALCHEMY__BASED_ON_NETWORK>">
            {children}
        </TokenKitWrapper>
    )
}

export default App
```

## Creating a custom component that will be used to show the selected token.

Create a preview component or a component that can be wrapped with the token modal. This component will help show the selected token and also it will act as a button to open the modal.

```tsx
import { Box, Group, Avatar, Stack, Text } from "@mantine/core"

// This can be any component, just a component to be wrapped with `SelectTokenModal` Component
const MyCustomTokenPreviewComponent = (props: any) => {
    const { token } = props
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

## Creating the modals styling object

Remember to use all the keys given here with different colors to match your overal project theme.

```ts
const stylingObject = {
    textColor: "white",
    modalBackground: "#11052d",
    headerFooterBackground: "rgba(0, 0, 0, 0.1)",
    tokenBackgroundColor: 'rgba(0, 0, 0, 0.1)',
    tokenHoverColor: 'rgba(0, 0, 0, 0.5)',
    searchBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    searchBorderColor: '#3d1698'
}
`
```

## Creating the Select Token component

Create a select token component to be put as a child of Tokenkit wrapper. Since Tokenkit wrapper wraps your entire app, you can simply use the component below in any page.

Make the component reusable so you don't have to create different components to achieve the same. That is, you can move the call back function and selectedToken as props and therefore you can reuse the component with a different token and call back function.

```tsx
import { SelectTokenModal, IToken } from "starknet-tokenkit"
import { useState } from "react"

/*
@params
selectedToken - This is the selected token for this particular component. It can be null or undefined.
callBackFunc - a callback function that will be called once one clicks ona given token. This callback function takes in IToken(token). ie function myFunc = (token: IToken) => {* Perforom your logic here *}
stylingObject - This is an object with different variables that will style the modal. Use the keys as are given in the above object.
*/

const SelectToken = () => {
    const [token, setToken] = useState<IToken>()
    return (
        <div>
            <SelectTokenModal selectedToken={token} callBackFunc={setToken} themeObject={stylingObject}>
                <MyCustomTokenPreviewComponent token={token} />
            </SelectTokenModal>
        </div>
    )
}
export default SelectToken
```

## Usage of component on a given Page

Finally, use the `SelectToken` component in one of your pages. You can make the `SelectToken` component as reusable as possible so as to be able to use it in different places with different callback functions.

```tsx
import SelectToken from './SelectToken'

const SwapPage = () => {

    return (
        <div>
            <SelectToken />
        </div>
    )
}
```

### Extra helpful functions

This package also provides  other few functions that can be used in differente scenarios ie 

```ts
import { 
    bigintToLongAddress,
    bigintToShortStr,
    limitChars,
    convertToReadableTokens,
} from 'starknet-tokenkit'

bigintToLongAddress(val: bigIntAddress) - This takes in an address in BigInt format and converts it to an address.

bigintToShortStr(val: felt252) - This takes in those fields you saved as felt252s, this means like short strings. It will convert it to a readable string.

limitChars(val: string, charsCount: number, has_dots: boolean) - This method helps in shortening a string to a given number of characters and whether you want it to have those 3 dots or not.

convertToReadableTokens(tokens: number|string, decimals: number) - This method takes in  the tokens count and the decimals for that token and returns a readable token number.

```