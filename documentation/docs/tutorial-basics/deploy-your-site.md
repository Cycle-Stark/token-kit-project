---
sidebar_position: 5
---

# Usage of component on a given Page

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
