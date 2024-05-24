import { Stack, Title, Grid, NumberInput, TextInput, Switch, Button, Loader, ActionIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { showNotification } from "@mantine/notifications"
import { IconCheck, IconAlertTriangle, IconWriting, IconUpload, IconInfoCircle, IconShield } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import BigNumber from "bignumber.js"
import { Contract } from "starknet"

import { useTokenKitContext } from "starknet-tokenkit"
import { USDC_ADDRESS_TESTNET, TOKEN_KIT_CONTRACT_ADDRESS_TESTNET, USDC_ADDRESS_MAINNET, TOKEN_KIT_CONTRACT_ADDRESS_MAINNET, ERC20_ABI } from "../../configs/utils"

interface IUpdateTokenForm {
    data: any
}

export const UpdateTokenForm = (props: IUpdateTokenForm) => {
    const { data } = props
    const { contract, reloadTokensFromContract } = useTokenKitContext()

    const [loading, setLoading] = useState(false)

    const form = useForm({
        initialValues: {
            token_index: data?.id ?? '',
            public: data?.public ?? false,
            verified: data?.verified ?? false,
            common: data?.common ?? false,
            icon_link: data?.icon ?? '',
            pair_id: data?.pair_id ?? '-',
        },
        validate: {
            icon_link: val => val === '' ? 'Icon link is required' : null
        }
    })

    const handleSubmit = () => {
        if (contract) {
            const call_data = form.values
            call_data.icon_link = form.values.icon_link
            const myCall = contract.populate('edit_token', call_data)

            contract.edit_token(myCall.calldata).then((_res: any) => {
                showNotification({
                    title: 'Update',
                    message: `Update Succesful`,
                    color: 'green',
                    icon: <IconCheck />
                })
                reloadTokensFromContract && reloadTokensFromContract()
            }).catch((err: any) => {
                showNotification({
                    title: 'Update failed',
                    message: `${err}`,
                    color: 'red',
                    icon: <IconAlertTriangle />
                })

            }).finally(() => {
                setLoading(false)
            })
        }
    }


    return (
        <form onSubmit={form.onSubmit(_values => handleSubmit())}>
            <Stack>
                <Title order={3}>Update Token</Title>
                <Grid>
                    <Grid.Col span={{ md: 12 }}>
                        <NumberInput disabled label="Token Index" placeholder="Token Index" radius={'md'} {...form.getInputProps('token_index')} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <Switch label="Common" radius={'md'} {...form.getInputProps('common', { type: 'checkbox' })} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <Switch label="Public" radius={'md'} {...form.getInputProps('public', { type: 'checkbox' })} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <Switch label="Verified" radius={'md'} {...form.getInputProps('verified', { type: 'checkbox' })} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 12 }}>
                        <TextInput label="Icon Link" placeholder="https://shortlink/xysx" radius={'md'} {...form.getInputProps('icon_link')} maxLength={29} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 12 }}>
                        <Button radius={'md'} type="submit" leftSection={loading ? <Loader size="sm" color="white" /> : <IconWriting size={'18px'} />} rightSection={loading ? <Loader color="white" size={'sm'} /> : null}>Update Token</Button>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form>
    )
}

export const ListTokenForm = () => {
    const [loading, setLoading] = useState(false)
    const { contract, reloadTokensFromContract } = useTokenKitContext()
    const [contract_, setContract] = useState<any>(contract)

    // console.log(contract_)
    const form = useForm({
        initialValues: {
            address: '',
            icon_link: '',
        },
        validate: {
            address: val => val === '' ? 'Token Address is required' : null,
            icon_link: val => val === '' ? 'Icon link is required' : null
        }
    })

    const handleSubmit = () => {
        if (contract_) {
            const call_data = form.values
            call_data.icon_link = form.values.icon_link
            const myCall = contract_.populate('add_token', call_data)

            contract_.add_token(myCall.calldata).then((_res: any) => {
                showNotification({
                    title: 'Token Listing',
                    message: `Token Added Succesfully`,
                    color: 'green',
                    icon: <IconCheck />
                })
                reloadTokensFromContract && reloadTokensFromContract()
            }).catch((err: any) => {
                showNotification({
                    title: 'Token listing failed',
                    message: `${err}`,
                    color: 'red',
                    icon: <IconAlertTriangle />
                })

            }).finally(() => {
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        setContract(contract)
    }, [contract])

    return (
        <form onSubmit={form.onSubmit(_values => handleSubmit())}>
            <Stack>
                <Title order={3}>List new Token</Title>
                <Grid>
                    <Grid.Col span={{ md: 12 }}>
                        <TextInput label="Token Address" placeholder="Token Address" radius={'md'} {...form.getInputProps('address')} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 12 }}>
                        <TextInput label="Icon Link" placeholder="https://shortlink/xysx" {...form.getInputProps('icon_link')} maxLength={29} radius={'md'} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 12 }}>
                        <Button radius={'md'} type="submit" leftSection={<IconUpload size={'18px'} />} rightSection={loading ? <Loader color="white" size={'sm'} /> : null}>List Token</Button>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form>
    )
}

interface IVerifyTokenBtn {
    token_index: any
}
export const VerifyTokenBtn = (props: IVerifyTokenBtn) => {
    const [loading, setLoading] = useState(false)
    const { token_index } = props
    const { contract, network, account } = useTokenKitContext()

    // console.log(contract)

    const handleVerify = async () => {
        if (contract) {
            // Sepolia testnet is using ETH about 0.001
            let amt_sepolia = new BigNumber(0.001).multipliedBy(10 ** 18).toNumber()

            // For mainnet the fee is 5 USDC and USDC is used for mainnet
            let amt = BigNumber(5_000_000).toNumber()

            let ERC_ADDRESS = USDC_ADDRESS_TESTNET
            let CONTRACT_ADDRESS = TOKEN_KIT_CONTRACT_ADDRESS_TESTNET
            const ERC20contract = new Contract(ERC20_ABI, ERC_ADDRESS, account)
            let erc20Call = ERC20contract.populate('approve', [CONTRACT_ADDRESS, amt_sepolia])

            if (network === 'SN_MAIN') {
                ERC_ADDRESS = USDC_ADDRESS_MAINNET
                CONTRACT_ADDRESS = TOKEN_KIT_CONTRACT_ADDRESS_MAINNET
                erc20Call = ERC20contract.populate('approve', [CONTRACT_ADDRESS, amt])
            }


            const calldata = [token_index]
            const myCall = contract.populate('verify_token', calldata)

            const multiCall = await account.execute(
                [
                    {
                        contractAddress: ERC_ADDRESS,
                        entrypoint: "approve",
                        calldata: erc20Call.calldata
                    },
                    {
                        contractAddress: CONTRACT_ADDRESS,
                        entrypoint: "verify_token",
                        calldata: myCall.calldata
                    }
                ]
            )

            account?.provider.waitForTransaction(multiCall.transaction_hash).then(() => {
                showNotification({
                    title: "Success",
                    message: "Token verified!!",
                    color: "green",
                    icon: <IconInfoCircle stroke={1.5} />
                })
            }).catch((e: any) => {
                console.log("Error: ", e)
                showNotification({
                    title: "Failure",
                    message: "Token verification failed!!",
                    color: "red",
                    icon: <IconAlertTriangle stroke={1.5} />
                })
            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <ActionIcon onClick={() => handleVerify()} loading={loading}>
            <IconShield />
        </ActionIcon>
    )
}


export const AddAdminForm = () => {
    const [loading, setLoading] = useState(false)
    const { contract } = useTokenKitContext()

    const form = useForm({
        initialValues: {
            address: '',
        },
        validate: {
            address: val => val === '' ? 'Admin Address is required' : null,
        }
    })

    const handleSubmit = () => {
        if (contract) {
            const call_data = form.values
            const myCall = contract.populate('add_admin', call_data)

            contract.add_admin(myCall.calldata).then((_res: any) => {
                showNotification({
                    title: 'New Admin',
                    message: `Admin Added Successfully`,
                    color: 'green',
                    icon: <IconCheck />
                })
            }).catch((err: any) => {
                showNotification({
                    title: 'Adding failed',
                    message: `${err}`,
                    color: 'red',
                    icon: <IconAlertTriangle />
                })

            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <form onSubmit={form.onSubmit(_values => handleSubmit())}>
            <Stack>
                <Title order={3}>Add New Admin</Title>
                <Grid>
                    <Grid.Col span={{ md: 12 }}>
                        <TextInput label="Admin Address" placeholder="Admin Address" radius={'md'} {...form.getInputProps('address')} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 12 }}>
                        <Button radius={'md'} type="submit" leftSection={<IconUpload size={'18px'} />} rightSection={loading ? <Loader color="white" size={'sm'} /> : null}>Add Admin</Button>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form>
    )
}


export const UpdateAdminForm = (props: { data: any }) => {
    const { data } = props
    const [loading, setLoading] = useState(false)
    const { contract } = useTokenKitContext()

    const form = useForm({
        initialValues: {
            address: data?.address ?? '',
            has_permission: data?.has_permission ?? false
        },
        validate: {
            address: val => val === '' ? 'Admin Address is required' : null,
        }
    })

    const handleSubmit = () => {
        if (contract) {
            const call_data = form.values
            const myCall = contract.populate('add_admin', call_data)

            contract.add_admin(myCall.calldata).then((_res: any) => {
                showNotification({
                    title: 'New Admin',
                    message: `Admin Updated Successfully`,
                    color: 'green',
                    icon: <IconCheck />
                })
            }).catch((err: any) => {
                showNotification({
                    title: 'Update failed',
                    message: `${err}`,
                    color: 'red',
                    icon: <IconAlertTriangle />
                })

            }).finally(() => {
                setLoading(false)
            })
        }
    }

    return (
        <form onSubmit={form.onSubmit(_values => handleSubmit())}>
            <Stack>
                <Title order={3}>Update Admin</Title>
                <Grid>
                    <Grid.Col span={{ md: 12 }}>
                        <TextInput label="Admin Address" disabled placeholder="Admin Address" radius={'md'} {...form.getInputProps('address')} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 4 }}>
                        <Switch label="Has Admin Permissions" radius={'md'} {...form.getInputProps('has_permission', { type: 'checkbox' })} />
                    </Grid.Col>
                    <Grid.Col span={{ md: 12 }}>
                        <Button radius={'md'} type="submit" leftSection={<IconUpload size={'18px'} />} rightSection={loading ? <Loader color="white" size={'sm'} /> : null}>Add Admin</Button>
                    </Grid.Col>
                </Grid>
            </Stack>
        </form>
    )
}
