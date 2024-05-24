import { ActionIcon, Box, Button, Tooltip } from '@mantine/core'
import { IconNetwork, IconWallet } from '@tabler/icons-react'
import { useTokenKitContext, limitChars } from 'starknet-tokenkit'
import { useEffect, useState } from 'react'

const ConnectWalletBtn = () => {
    const { handleConnetDisconnectWalletBtnClick, address } = useTokenKitContext()

    return (
        <Button onClick={handleConnetDisconnectWalletBtnClick} radius={'md'} leftSection={<IconWallet />} variant='light' color='violet'>
            {address ? limitChars(address ?? '', 6, true) : 'Connect'}
        </Button>
    )
}

export const DisplayConnectedNetwork = () => {
    const { network } = useTokenKitContext()
    const [network_, setNetwork] = useState<any>(network === "SN_SEPOLIA" ? "Sepolia Testnet" : "Mainnet")
    function getNetwork() {
        if (network === "SN_SEPOLIA") {
            setNetwork("Sepolia Testnet")
            // return "Sepolia Testnet"
        }
        else if (network === "SN_MAIN") {
            setNetwork("Mainnet")
            // return "Mainnet"
        }
    }

    useEffect(() => {
        getNetwork()
    }, [network])

    return (
        <>
            <Box visibleFrom='md'>
                <Button radius={'xl'} size='xs' style={{ pointerEvents: "none" }} variant='light' color={network_ === "Mainnet" ? "green" : "yellow"}>
                    {network_}
                </Button>
            </Box>
            <Box hiddenFrom='md'>
                <Tooltip label={network_}>
                    <ActionIcon radius={'xl'} size='lg' style={{ pointerEvents: "none" }} variant='light' color={network_ === "Mainnet" ? "green" : "yellow"}>
                        <IconNetwork />
                    </ActionIcon>
                </Tooltip>
            </Box>
        </>
    )
}

export default ConnectWalletBtn