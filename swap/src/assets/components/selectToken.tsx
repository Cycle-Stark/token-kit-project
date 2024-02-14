import { useState } from 'react'
import { IToken, SelectTokenModal } from 'starknet-tokenkit'

const SelectToken = () => {
    const [token, setToken] = useState<IToken>()
    return (
        <div>
            <SelectTokenModal selectedToken={token} callBackFunc={setToken} themeObject={{
                searchTextColor: 'white',
                searchBorderColor: 'purple',
                searchBackgroundColor: 'rgba(0, 0, 0, 0.2)',
                textColor: 'white',
                modalBackground: 'purple',
                headerFooterBackground: 'rgba(0, 0, 0, 0.1)',
                tokenBackgroundColor: 'rgba(0, 0, 0, 0.1)',
                tokenHoverColor: 'rgba(0, 0, 0, 0.1)',
            }}>
                <button>
                    {token ? token?.name : 'Select token'}
                </button>
            </SelectTokenModal>
        </div>
    )
}

export default SelectToken