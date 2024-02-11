
import { ListTokenForm, TokensTable } from 'tokenkit'
import SelectToken from '../components/SelectToken'
import { Box, Code, Grid, Group, Stack, Text, TextInput, Title } from '@mantine/core'
import { CodeHighlight, CodeHighlightTabs, InlineCodeHighlight } from '@mantine/code-highlight';
import { DataTable } from 'mantine-datatable'
// import hljs from 'highlight.js/lib/core';
// import shell from 'highlight.js/lib/languages/shell';
// hljs.registerLanguage('shell', shell);
// import 'highlight.js/styles/github.css';

const usageCode = `
import { Button } from "@mantine/core"
import { IconCurrencyDollar } from "@tabler/icons-react"
import { useState } from "react"
import { SelectTokenModal, IToken } from "starknet-tokenkit"

const SelectToken = () => {
    const [token, setToken] = useState<IToken>()
    return (
        <div>
            <SelectTokenModal selectedToken={token} callBackFunc={setToken}>
                <Button radius={'md'} leftSection={<IconCurrencyDollar size={'18px'} />}>
                    {
                        token ? token?.name : 'Select Token'
                    }
                </Button>
            </SelectTokenModal>
        </div>
    )
}

export default SelectToken
`

const pageCode = `
import SelectToken from './SelectToken'

const SwapPage = () => {

    return (
        <div>
            <SelectToken />
        </div>
    )
}
`

const wrapperCode = `
import { TokenKitWrapper } from 'starknet-tokenkit'

const App = (props: any) => {
    const { children } = props
    return (
        <TokenKitWrapper usingMantine={true}>
            {children}
        </TokenKitWrapper>
    )
}

export default App
`

const Home = () => {
    return (
        <Stack>
            <Box h={'50dvh'}>
                <Stack justify='center' align='center' className='h-100'>
                    <Title ta={'center'} fw={700} size={'100px'}>Token Kit</Title>
                    <Text ta="center" fw={500} size='22px'>Empower Your dApp: Seamlessly Load Starknet Tokens with Token Kit</Text>
                </Stack>
            </Box>
            <Grid py={'50px'}>
                <Grid.Col span={{ md: 12 }}>
                    <Title order={2} size={'62px'} ta={'center'}>How To</Title>
                </Grid.Col>
                <Grid.Col span={{ md: 6 }}>
                    <Stack>
                        <Title order={2}>Installation</Title>
                        <Text>
                            To install Starknet Token Kit simply use the commands below.
                        </Text>
                        <Box style={{ borderRadius: '10px', overflow: 'hidden' }} >
                            <CodeHighlightTabs
                                expandCodeLabel="Show full code"
                                collapseCodeLabel="Show less"
                                code={[
                                    { fileName: 'Yarn', code: `yarn add starknet-tokenkit`, language: 'sh' },
                                    { fileName: 'Npm', code: `npm i starknet-tokenkit`, language: 'shell' },
                                ]}
                            />
                        </Box>
                        <Title order={2}>Setting Up your Application</Title>
                        <Text>Starknet Token Kit exposes a <InlineCodeHighlight code='<TokenKitWrapper />' /> component that you need to wrap your app with as below. </Text>
                        <Text>
                            The <Code>usingMantine</Code> prop is required. If you are using <Code>mantine UI</Code> as your UI library set it to <Code>true</Code> otherwise set it <Code>false</Code>
                        </Text>
                        <Box style={{ borderRadius: '10px', overflow: 'hidden' }} >
                            <CodeHighlight code={wrapperCode} />
                        </Box>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ md: 6 }}>
                    <Stack>
                        <Title order={2}>Usage</Title>
                        <Text>
                            The token kit exposes some components and functions that you can use to achieve different functionality ranging from selecting tokens to converting data ie
                            {' '}  <InlineCodeHighlight code='hexadecimals' /> to readable strings.
                        </Text>
                        <Box style={{ borderRadius: '10px', overflow: 'hidden' }} >
                            <CodeHighlight code={usageCode} language='tsx' />
                        </Box>

                        <Title order={2}>On Page Usage</Title>
                        <Text>
                            Now you can import your component and use it in your page as below.
                        </Text>
                        <Box style={{ borderRadius: '10px', overflow: 'hidden' }} >
                            <CodeHighlight code={pageCode} language='tsx' />
                        </Box>
                        <Title order={2}>Output will be as below</Title>
                        <Group justify='start'>
                            <SelectToken />
                        </Group>
                    </Stack>
                </Grid.Col>
            </Grid>
            <TokensTable DataTable={DataTable} />
            <ListTokenForm />
            {/* <ConnectWalletBtn />
            <TokensTable />
            <AddAdminForm />
            <div>
                <SelectToken />
            </div> */}
        </Stack>
    )
}

export default Home