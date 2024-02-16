import { ActionIcon, Grid, Group, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IToken, convertToReadableTokens, useTokenKitContext } from 'starknet-tokenkit'
import SelectToken from '../SelectToken'
import { IconAlertCircle, IconArrowsDownUp } from '@tabler/icons-react'
import { showNotification } from '@mantine/notifications'
import inputStyles from './../../styles/input.module.css'
import { useEffect, useMemo } from 'react'
import { Contract, RpcProvider } from 'starknet'
import { ERC20_ABI, formatNumber } from '../../config/utils'
import axios from 'axios'


interface ICustomInput {
    form: any
    fieldname: string
    disabled: boolean
}

const CustomInput = (props: ICustomInput) => {
    const { form, fieldname, disabled } = props
    return (
        <TextInput disabled={disabled} className={inputStyles.custom_input} inputWrapperOrder={['label', 'input']} size='xl' radius={'xl'} style={{}} ta={'end'} styles={{
            input: {
                background: '#2c114c99',
                borderWidth: '4px',
                textAlign: 'end',
                fontWeight: 600,
                borderColor: '#42167757',
            }
        }} placeholder='1200' {...form.getInputProps(fieldname)} />
    )
}

// interface ISwapForm {
//     token_1: IToken | null,
//     token_2: IToken | null,
//     token_1_amount: string | number
//     token_2_amount: string | number
//     token_1_balance: string | number
//     token_2_balance: string | number
// }

const SwapCard = () => {
    const { address } = useTokenKitContext()
    const form = useForm<any>({
        initialValues: {
            token_1: null,
            token_2: null,
            token_1_amount: "",
            token_2_amount: "",
            token_1_balance: "",
            token_2_balance: "",
        },
    })

    const changeTokenPositions = () => {
        const token_1 = structuredClone(form.values.token_1)
        const token_2 = structuredClone(form.values.token_2)

        form.setFieldValue('token_1', token_2)
        form.setFieldValue('token_2', token_1)

        const token_1_amount = form.values.token_1_amount
        const token_2_amount = form.values.token_2_amount

        form.setFieldValue('token_1_amount', token_2_amount)
        form.setFieldValue('token_2_amount', token_1_amount)

        const token_1_balance = form.values.token_1_balance
        const token_2_balance = form.values.token_2_balance

        form.setFieldValue('token_1_balance', token_2_balance)
        form.setFieldValue('token_2_balance', token_1_balance)
    }

    const setTokenValue = (fieldname: string, token: IToken) => {
        if (fieldname === 'token_1') {
            const token_2 = form.values.token_2
            if (token_2?.address === token.address) {
                showNotification({
                    title: 'Error',
                    message: 'Select a different token. Tokens cannot be the same!',
                    color: 'red',
                    icon: <IconAlertCircle />
                })
                return
            }
        }
        else if (fieldname === 'token_2') {
            const token_1 = form.values.token_1
            if (token_1?.address === token.address) {
                showNotification({
                    title: 'Error',
                    message: 'Select a different token. Tokens cannot be the same!',
                    color: 'red',
                    icon: <IconAlertCircle />
                })
                return
            }

        }
        form.setFieldValue(fieldname, token)
    }
    const fetchTokenBalance = async (field_prefix: string) => {
        const token_val: any = form.values[field_prefix]
        if (token_val) {
            const ERC_ADDRESS: any = token_val.address
            if (ERC_ADDRESS && address) {
                const ERC20contract = new Contract(ERC20_ABI, ERC_ADDRESS)
                const provider = new RpcProvider({ nodeUrl: 'https://starknet-goerli.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec' })
                const erc20Call = ERC20contract.populate('balanceOf', [address])

                provider.callContract(erc20Call).then((res: any) => {
                    const long_balance = parseInt(res.result[0])
                    const decimals: any = token_val?.decimals
                    const balance = convertToReadableTokens(long_balance, decimals)
                    form.setFieldValue(`${field_prefix}_balance`, balance)
                }).catch(() => { })
            }
        }
    }

    const calculateAmountForT2 = () => {
        const token_1_amount = form.values.token_1_amount
        const token_1_price = form.values?.token_1?.price
        const token_2_price = form.values?.token_2?.price
        if (token_1_amount && token_1_price && token_2_price) {
            console.log(token_1_amount, token_1_price.price, token_2_price.price)
            const token_2_amount = (parseFloat(token_1_amount) / token_2_price.price) * token_1_price.price
            form.setFieldValue('token_2_amount', Number(token_2_amount).toFixed(4))
        }

    }

    // const there_are_changes = useMemo(() => ({
    //     token_1_amount: form.values.token_1_amount,
    //     token_1_price: form.values?.token_1?.price,
    //     token_2_price: form.values?.token_2?.price,
    // }), [form.values.token_1_amount, form.values?.token_1?.price, form.values?.token_2?.price])

    const loadPairPrice = () => {
        const token_1 = form.values.token_1
        const token_2 = form.values.token_2
        const token_1_amount = form.values.token_1_amount
        if (token_1 && token_2 && token_1_amount !== '') {
            axios.get(`https://goerli-api.ekubo.org/quote/${token_1_amount}/${token_1.address}/${token_2.address}`).then((res: any) => {
                form.setFieldValue('token_2_amount', convertToReadableTokens(res?.amount, token_2.decimals))
            }).catch((error: any) => {
                console.log(error)
            })
        }
    }

    const checkIfBalanceIsEnough = () => {
        const token_balance = form.values.token_1_balance
        const token_amt = form.values.token_1_amount
        console.log("amt", token_balance)

        if (parseFloat(token_balance) < token_amt || token_balance === "") {
            form.setFieldError('token_1_amount', 'Insufficient balance')
        }

    }

    const token_1_address_changed = useMemo(() => ({
        address: form.values.token_1?.address
    }), [form.values.token_1?.address, address])

    const token_2_address_changed = useMemo(() => ({
        address: form.values.token_2?.address
    }), [form.values.token_2?.address, address])

    useEffect(() => {
        fetchTokenBalance('token_1')
    }, [token_1_address_changed])

    useEffect(() => {
        fetchTokenBalance('token_2')
    }, [token_2_address_changed])

    useEffect(() => {
        calculateAmountForT2()
    }, [form.values.token_1_amount])

    useEffect(() => {
        loadPairPrice()
    }, [form.values.token_1?.address, form.values.token_2?.address])

    useEffect(() => {
        checkIfBalanceIsEnough()
    }, [form.values.token_1_amount, form.values.token_1_balance])

    return (
        <div>
            <form>
                <Grid>
                    <Grid.Col span={6}>
                        <Stack className='h-100' justify='end' gap={0}>
                            <Text ml={'20px'}>From</Text>
                            <SelectToken token={form.values.token_1} setTokenFn={setTokenValue} fieldname='token_1' />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack className='h-100' gap={4} justify='end'>
                            <Text size='xs' ta={'end'} mr="10px">Balance: {form.values.token_1?.symbol ?? ''} {formatNumber(form.values.token_1_balance ?? 0) ?? '0.0000'}</Text>
                            <CustomInput form={form} fieldname="token_1_amount" disabled={false} />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Group align='center' justify='center'>
                            <ActionIcon radius={'xl'} size={'xl'} variant='light' color='violet' onClick={changeTokenPositions}>
                                <IconArrowsDownUp />
                            </ActionIcon>
                        </Group>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack className='h-100' justify='end' gap={0}>
                            <Text ml={'20px'}>To</Text>
                            <SelectToken token={form.values.token_2} setTokenFn={setTokenValue} fieldname='token_2' />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Stack className='h-100' gap={4} justify='end'>
                            <Text size='xs' ta={'end'} mr="10px">Balance: {form.values.token_2?.symbol ?? ''} {formatNumber(form.values.token_2_balance ?? 0) ?? '0.0000'}</Text>
                            <CustomInput form={form} fieldname="token_2_amount" disabled={true} />
                        </Stack>
                    </Grid.Col>
                    <Grid.Col span={12}>
                        <Group justify='space-between'>
                            <Text>Min received</Text>
                            {
                                form.values.token_2_amount ? (
                                    <Text ta={'end'} fw={600}>≈ {formatNumber(form.values.token_2_amount)} {form.values.token_2?.symbol}</Text>
                                ) : null
                            }
                        </Group>
                    </Grid.Col>
                </Grid>
            </form>
        </div>
    )
}

export default SwapCard