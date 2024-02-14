import { Button } from '@mantine/core'
import { useTokenKitContext, limitChars } from 'starknet-tokenkit'
import { IconWallet } from '@tabler/icons-react'

const ConnectWalletBtn = () => {
    const { handleConnetDisconnectWalletBtnClick, address } = useTokenKitContext()

    return (
        <Button onClick={handleConnetDisconnectWalletBtnClick} radius={'md'} leftSection={<IconWallet />}>
            {address ? limitChars(address ?? '', 10, true) : 'Connect wallet'}
        </Button>
    )
}

export default ConnectWalletBtn