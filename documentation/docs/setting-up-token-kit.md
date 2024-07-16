---
sidebar_position: 2
title: "Setting Up Tokenkit"
---

# Setting Up Tokenkit
 
Once the package has been installed, wrap your entire application in the TokenkitWrapper and import tokenkit styling as below.

## Linking the Tokenkit Wrapper
To use Tokenkit, its pretty easy, first you import the `TokenKitWrapper` and wrap your entire app with it.

Use RPC node urls that can be provided by different providers such us [Juno](https://docs.data.voyager.online/), [Blastapi](https://blastapi.io/public-api/starknet), [infura](https://www.infura.io/), and [alchemy](https://www.alchemy.com/).



### Create the modal styling object

Remember to use all the keys given here with different colors to match your overal DApp theme. Use our landing page to create your theme [here](https://tokenkit-gamma.vercel.app/)

```ts
const stylingObject = {
    r: "20px",
    textColor: "white",
    headerFooterBg: "rgba(0, 0, 0, 0.28)",
    backgroundColor: "#06a5a3",
    fontFamily: "Space Grotesk, sans-serif",
    searchBackground: "rgba(151, 244, 238, 0.46)",
    searchColor: "white",
    searchBorderColor: "rgba(14, 6, 46, 0)",
    searchFocusBorderColor: "rgba(151, 244, 238, 1)",
    primaryColor: "rgba(0, 97, 91, 1)"
}
```

```tsx
import { TokenKitWrapper } from 'starknet-tokenkit'
import 'starknet-tokenkit/dist/index.css' // Remember to import styling

/*
@params
network: 'SN_MAIN' | 'SN_SEPOLIA' -> Both are fully supported
sepoliaNodeURL: string
mainnetNodeURL: string
*/

const App = (props: any) => {
    const { children } = props
    return (
       <TokenKitWrapper
        network="SN_MAIN" // Required - 'SN_MAIN' | 'SN_SEPOLIA'
        sepoliaNodeURL="https://starknet-sepolia.infura.io/v3/**********" // Required
        mainnetNodeURL="https://starknet-mainnet.infura.io/v3/******************" // Required
        themeObject={stylingObject} // Required
        >
            {children}
        </TokenKitWrapper>
    )
}

export default App
```

Once this is done, you can start setting up your tokens modal and container components.









