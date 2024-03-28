---
sidebar_position: 3
---

# Creating the Select Token component

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
