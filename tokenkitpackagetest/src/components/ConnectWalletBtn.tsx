import { Button } from '@mantine/core'
import { useTokenKitContext, limitChars } from 'starknet-tokenkit'
import { IconWallet } from '@tabler/icons-react'

const ConnectWalletBtn = () => {
    const { handleConnetDisconnectWalletBtnClick, address } = useTokenKitContext()

    return (
        <Button onClick={handleConnetDisconnectWalletBtnClick} radius={'md'} leftSection={<IconWallet />} variant='light' color='violet'>
            {address ? limitChars(address ?? '', 6, true) : 'Connect'}
        </Button>
    )
}

export default ConnectWalletBtn