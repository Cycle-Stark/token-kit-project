
import { Stack, Grid, TextInput, Select, Group, Button, Drawer, Avatar, em, ActionIcon, Text, Card, Tooltip } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { IconFilter, IconReload, IconCheck, IconX, IconWriting } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { removeTrailingZeros, limitChars } from '../configs/utils';
import CustomCopyBtn from './CustomCopyButton';
import { UpdateTokenForm, VerifyTokenBtn } from './forms/forms';
import { useTokenKitContext, IToken, db } from 'starknet-tokenkit';
import { DataTable } from 'mantine-datatable'


const TokensTable = () => {
    const { reloadTokensFromContract, network } = useTokenKitContext()
    const [network_, setNetwork] = useState<any>(network)
    const [page, setPage] = useState(1)


    const [tokens, setTokens] = useState<IToken[]>([])
    const [token, setToken] = useState<IToken>()
    const [opened, { open, close }] = useDisclosure(false)

    const [totalTokens, setTotalTokens] = useState(0)
    const [haveTokensChanged, setHaveTokensChanged] = useState<any>(null)

    // const theme = useMantineTheme()

    const tokensPerPage = 100
    // const totalTokens = useLiveQuery(() => db.tokens.count())
    // const have_tokens_changed = useLiveQuery(() => db.tokens.toArray())


    const checkforChanges = async () => {
        if (network_ === "SN_SEPOLIA") {
            const ttokens = await db.tokens.count()
            const haveChanges = await db.tokens.toArray()
            setTotalTokens(ttokens)
            setHaveTokensChanged(haveChanges)
        }
        else if (network_ === "SN_MAIN") {
            const ttokens = await db.mainnet_tokens.count()
            const haveChanges = await db.mainnet_tokens.toArray()
            setTotalTokens(ttokens)
            setHaveTokensChanged(haveChanges)
        }
    }

    const filterForm = useForm({
        initialValues: {
            searchedToken: '',
            common: 'all',
            public: 'all',
            verified: 'all',
        }
    })

    async function loadTokensFromDB() {
        const limit = tokensPerPage;
        const offset = (page - 1) * tokensPerPage;

        const regex = new RegExp(`(${filterForm.values.searchedToken})`, 'gi');

        const addressSearchTerm = removeTrailingZeros(filterForm.values.searchedToken)
        const addressRegex = new RegExp(`(${addressSearchTerm})`, 'gi');

        if (network_ === "SN_SEPOLIA") {
            const filteredTokens = await db.tokens
                .filter((token: IToken) => {
                    const regexMatched = !!(token.symbol.match(regex) || token.name.match(regex) || removeTrailingZeros(token.address).match(addressRegex));
                    const commonMatched = filterForm.values.common === 'true' ? token.common === true :
                        filterForm.values.common === 'false' ? token.common === false : true;
                    const verifiedMatched = filterForm.values.verified === 'true' ? token.verified === true :
                        filterForm.values.verified === 'false' ? token.verified === false : true;
                    const publicMatched = filterForm.values.public === 'true' ? token.public === true :
                        filterForm.values.public === 'false' ? token.public === false : true;

                    return regexMatched && commonMatched && verifiedMatched && publicMatched;
                })
                .limit(limit)
                .offset(offset)
                .toArray();
            setTokens(filteredTokens);
        }
        else if (network_ === "SN_MAIN") {
            const filteredTokens = await db.mainnet_tokens
                .filter((token: IToken) => {
                    const regexMatched = !!(token.symbol.match(regex) || token.name.match(regex) || removeTrailingZeros(token.address).match(addressRegex));
                    const commonMatched = filterForm.values.common === 'true' ? token.common === true :
                        filterForm.values.common === 'false' ? token.common === false : true;
                    const verifiedMatched = filterForm.values.verified === 'true' ? token.verified === true :
                        filterForm.values.verified === 'false' ? token.verified === false : true;
                    const publicMatched = filterForm.values.public === 'true' ? token.public === true :
                        filterForm.values.public === 'false' ? token.public === false : true;

                    return regexMatched && commonMatched && verifiedMatched && publicMatched;
                })
                .limit(limit)
                .offset(offset)
                .toArray();

            setTokens(filteredTokens);
        }
    }

    const updateTokenModal = (token: IToken) => {
        setToken(token)
        open()
    }

    const reloadTokens = () => {
        reloadTokensFromContract && reloadTokensFromContract()
        // loadTokensFromDB()
    }

    const sortTokens = () => {
        const _tokens: any = tokens;
        return _tokens?.sort((a: IToken, b: IToken) => {
            const aScore = (a.verified ? 4 : 0) + (a.common ? 2 : 0) + (a.public ? 1 : 0);
            const bScore = (b.verified ? 4 : 0) + (b.common ? 2 : 0) + (b.public ? 1 : 0);

            // Higher score comes first
            return bScore - aScore;
        }) ?? [];
    };

    useEffect(() => {
        setTokens([])
        loadTokensFromDB()
    }, [haveTokensChanged, network_, totalTokens])

    useEffect(() => {
        checkforChanges()
        setNetwork(network)
    }, [network])


    return (
        <Stack>
            <Card radius={'lg'}>
                <form onSubmit={filterForm.onSubmit(_values => loadTokensFromDB())}>
                    <Grid>
                        <Grid.Col span={{ md: 3 }}>
                            <TextInput label="Search Token" placeholder='Search by name, symbol or address' radius={'md'} {...filterForm.getInputProps('searchedToken')} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 2 }}>
                            <Select label="Common" radius={'md'} placeholder="True/False" data={[
                                { value: 'all', label: 'All' },
                                { value: 'true', label: 'True' },
                                { value: 'false', label: 'False' },
                            ]} {...filterForm.getInputProps('common')} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 2 }}>
                            <Select label="Verified" radius={'md'} placeholder="True/False" data={[
                                { value: 'all', label: 'All' },
                                { value: 'true', label: 'True' },
                                { value: 'false', label: 'False' },
                            ]} {...filterForm.getInputProps('verified')} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 2 }}>
                            <Select label="Public" radius={'md'} placeholder="True/False" data={[
                                { value: 'all', label: 'All' },
                                { value: 'true', label: 'True' },
                                { value: 'false', label: 'False' },
                            ]} {...filterForm.getInputProps('public')} />
                        </Grid.Col>
                        <Grid.Col span={{ md: 3 }}>
                            <Group h={'100%'} justify="start" align='end'>
                                <Button radius={'md'} type='submit' size='xs' leftSection={<IconFilter size={'16px'} />}>Filter</Button>
                                <Button color='indigo' size='xs' onClick={reloadTokens} radius={'md'} leftSection={<IconReload size={'16px'} />}>Refresh</Button>
                            </Group>
                        </Grid.Col>
                    </Grid>
                </form>
            </Card>
            <Drawer opened={opened} onClose={close} title={`Updating ${token?.name}`} position='right' size={'sm'}>
                <UpdateTokenForm data={token} />
            </Drawer>
            <DataTable
                // bg={theme.colors.violet[9]}
                withTableBorder
                minHeight={300}
                verticalSpacing={'md'}
                horizontalSpacing={'md'}
                borderRadius={'lg'}
                records={sortTokens() ?? []}
                key={network_}
                columns={[
                    {
                        accessor: 'id',
                        title: 'ID',
                        width: '100px',
                        render: (item: IToken) => (
                            <Text size='sm'>{item.id}</Text>
                        )
                    },
                    {
                        accessor: 'name',
                        title: 'Name',
                        width: '250px',
                        render: (item: IToken) => (
                            <Group align='center' gap={'sm'} wrap='nowrap'>
                                <Avatar src={item.icon} size={'md'} radius={'md'} tt={'uppercase'} style={{ objectFit: 'contain' }}>
                                    {limitChars(item.name, 2, false)}
                                </Avatar>
                                <Text size='sm'>{item.name}</Text>
                            </Group>
                        )
                    },
                    {
                        accessor: 'symbol',
                        title: 'Symbol',
                        width: '200px',
                        render: (item: IToken) => (
                            <Text size='sm'>{item.symbol}</Text>
                        )
                    },
                    {
                        accessor: 'address',
                        title: 'Token Address',
                        width: '300px',
                        render: (item: IToken) => (
                            <Group gap={10} wrap='nowrap'>
                                <CustomCopyBtn color={'green'} copy_value={item.address} />
                                <Text size='sm'>{limitChars(item.address, 20, true)}</Text>
                            </Group>
                        )
                    },
                    {
                        accessor: 'decimals',
                        title: 'Decimals',
                        width: '100px',
                        textAlign: 'center',
                        render: (item: IToken) => (
                            <Text size='sm' ta={'center'} fw={500}>{item.decimals}</Text>
                        )
                    },
                    {
                        accessor: 'common',
                        title: 'Common',
                        width: '150px',
                        textAlign: 'center',
                        render: (item: IToken) => (
                            <Group justify='center'>
                                {item.common ? <IconCheck color='green' stroke={em(1.5)} /> : <IconX color='red' stroke={em(1.5)} />}
                            </Group>
                        )
                    },
                    {
                        accessor: 'verified',
                        title: 'Verified',
                        width: '150px',
                        textAlign: 'center',
                        render: (item: IToken) => (
                            <Group justify='center'>
                                {item.verified ? <IconCheck color='green' stroke={em(1.5)} /> : <IconX color='red' stroke={em(1.5)} />}
                            </Group>
                        )
                    },
                    {
                        accessor: 'public',
                        title: 'Public',
                        width: '150px',
                        textAlign: 'center',
                        render: (item: IToken) => (
                            <Group justify='center'>
                                {item.public ? <IconCheck color='green' stroke={em(1.5)} /> : <IconX color='red' stroke={em(1.5)} />}
                            </Group>
                        )
                    },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        width: '170px',
                        textAlign: 'center',
                        render: (item: IToken) => (
                            <Group justify='center'>
                                <Tooltip label={`Update ${item.name}`} radius={'md'}>
                                    <ActionIcon onClick={() => updateTokenModal(item)} variant='light' size={'lg'} radius={'xl'}>
                                        <IconWriting size={'20px'} />
                                    </ActionIcon>
                                </Tooltip>
                                <VerifyTokenBtn token_index={item.id} />
                            </Group>
                        )
                    },
                ]}
                page={page}
                onPageChange={setPage}
                totalRecords={totalTokens}
                recordsPerPage={25}
            />
        </Stack>
    )
}

export default TokensTable

