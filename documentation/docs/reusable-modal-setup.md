---
sidebar_position: 5
title: "Reusable Tokens Modal"
---

# Reusable Tokens Modal


## Sample Reusable Modal
```tsx

import { IToken } from "starknet-tokenkit"

interface IReusableSelectToken{
    selectedToken: IToken
    callBackFn: any
    children: ReactNode
}


const ReusableSelectToken = (props: IReusableSelectToken) => {

    return (
        <div>
            <SelectTokenModal 
                selectedToken={props?.token} 
                callBackFunc={props?.callBackFn} 
                animation={'fade'} // Optional - Default 'fade', Options: 'bounce' | 'slide' | 'ease' | 'fade'
            >
                {children}
            </SelectTokenModal>
        </div>
    )
}
export default SelectToken
```


## How to use reusable modal

We have already created our token preview component, so lets import both and use them on a page

```tsx

import ReusableSelectToken from '../components/ReusableSelectToken.tsx'
import TokenPreviewComponent from '../components/TokenPreviewComponent.tsx'
import { IToken } from "starknet-tokenkit"

export default const SwapPage = () => {
    const [fromToken, setFromToken] = useState<IToken>()
    const [toToken, setToToken] = useState<IToken>()

    return (
        <>
            <ReusableSelectToken selectedToken={fromToken} callBackFn={setFromToken}>
                <TokenPreviewComponent token={fromToken} />
            </ReusableSelectToken>
            <ReusableSelectToken selectedToken={toToken} callBackFn={setToToken}>
                <TokenPreviewComponent token={toToken} />
            </ReusableSelectToken>
        </>
    )
}

```





