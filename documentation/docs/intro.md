---
sidebar_position: 1
title: "Getting started"
---

# TokenKit
Starknet Tokenkit is a package that provides quick access to tokens in a modal format or you can interact with the contract to read the different tokens using the contract address and the abi.


Also you can add your own token by visiting the landing page: [Tokenkit](https://tokenkit-gamma.vercel.app)

---
- This is tested on React.
---

## Linking the Tokenkit Wrapper
To use Tokenkit, its pretty easy, first you import the `TokenKitWrapper` and wrap your entire app with it.

```tsx
import { TokenKitWrapper } from 'starknet-tokenkit'
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

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 18.0 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.














