
import { ListTokenForm, TokensTable } from 'tokenkit'
import SelectToken from '../components/SelectToken'
import { Box, Card, Code, Grid, Group, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { CodeHighlight, CodeHighlightTabs, InlineCodeHighlight } from '@mantine/code-highlight';
import { DataTable } from 'mantine-datatable'
import CustomBoxWithRadius from '../components/common/CustomBoxWithRadius';
// import hljs from 'highlight.js/lib/core';
// import shell from 'highlight.js/lib/languages/shell';
// hljs.registerLanguage('shell', shell);
// import 'highlight.js/styles/github.css';

const stylingObject = `
{
    textColor: "white",
    modalBackground: "#11052d",
    headerFooterBackground: "rgba(0, 0, 0, 0.1)",
    tokenBackgroundColor: 'rgba(0, 0, 0, 0.1)',
    tokenHoverColor: 'rgba(0, 0, 0, 0.5)',
    searchBackgroundColor: 'rgba(0, 0, 0, 0.5)',
    searchBorderColor: '#3d1698'
}
`

const usageCode = `
import { Button } from "@mantine/core"
import { IconCurrencyDollar } from "@tabler/icons-react"
import { useState } from "react"
import { SelectTokenModal, IToken } from "starknet-tokenkit"

// This can be any component, just a component to be wrapped with \`SelectTokenModal\` Component
const MyCustomTokenPreviewComponent = (props: any) => {
    const { token } = props
    return (
        <Box p={'sm'} style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '10px',
            cursor: 'pointer'
        }}>
            <Group gap={6} align="center">
                <Avatar src={token?.icon}>
                    {limitChars(token?.symbol ?? 'ST', 2, false)}
                </Avatar>
                {
                    token ? (
                        <Stack gap={2}>
                            <Text size="sm" fw={500}>{token?.name}</Text>
                            <Text size="xs">{token?.symbol}</Text>
                        </Stack>
                    ) : <Text>Select Token</Text>
                }
            </Group>
        </Box>
    )
}

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
        <TokenKitWrapper usingMantine={true} primaryColor='violet' theme='dark'>
            {children}
        </TokenKitWrapper>
    )
}

export default App
`

const Home = () => {
    const theme = useMantineTheme()

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
                <Grid.Col span={{ md: 12 }}>
                    <Stack>
                        <Title order={2}>Installation</Title>
                        <Text>
                            To install Starknet Token Kit simply use the commands below.
                        </Text>
                        <CustomBoxWithRadius>
                            <CodeHighlightTabs
                                expandCodeLabel="Show full code"
                                collapseCodeLabel="Show less"
                                code={[
                                    { fileName: 'Yarn', code: `yarn add starknet-tokenkit`, language: 'sh' },
                                    { fileName: 'Npm', code: `npm i starknet-tokenkit`, language: 'shell' },
                                ]}
                            />
                        </CustomBoxWithRadius>
                        <Title order={2}>Setting Up your Application</Title>
                        <Text>Starknet Token Kit exposes a <InlineCodeHighlight code='<TokenKitWrapper />' /> component that you need to wrap your app with as below. </Text>
                        <Text>
                            The <Code>usingMantine</Code> prop is required. If you are using <Code>mantine UI</Code> as your UI library set it to <Code>true</Code> otherwise set it <Code>false</Code>
                        </Text>
                        <CustomBoxWithRadius>
                            <CodeHighlight code={wrapperCode} />
                        </CustomBoxWithRadius>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ md: 12 }}>
                    <Stack>
                        <Title order={2}>Usage</Title>
                        <Text>
                            The token kit exposes some components and functions that you can use to achieve different functionality ranging from selecting tokens to converting data ie
                            {' '}  <InlineCodeHighlight code='hexadecimals' /> to readable strings.
                        </Text>
                        <Grid>
                            <Grid.Col span={{ md: 12 }}>
                                <Stack>
                                    <Title order={4}>Styling object</Title>
                                    <Text>Style your modal to match your theme!</Text>
                                    <CustomBoxWithRadius>
                                        <CodeHighlight code={stylingObject} language='ts' />
                                    </CustomBoxWithRadius>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={{ md: 12 }}>
                                <Stack>
                                    <Title order={4}>Create your modal</Title>
                                    <Text>Import the SelectTokenModal component to create your component</Text>
                                    <CustomBoxWithRadius>
                                        <CodeHighlight code={usageCode} language='tsx' />
                                    </CustomBoxWithRadius>
                                </Stack>
                            </Grid.Col>
                        </Grid>

                        <Title order={2}>On Page Usage</Title>
                        <Text>
                            Now you can import your component and use it in your page as below.
                        </Text>
                        <CustomBoxWithRadius>
                            <CodeHighlight code={pageCode} language='tsx' />
                        </CustomBoxWithRadius>
                        <Card bg={theme.colors.dark[8]} radius={'lg'} p={'50px'}>
                            <Stack>
                                <Title order={2} ta={'center'}>Output will be as below</Title>
                                <Group justify='center'>
                                    <SelectToken />
                                </Group>
                            </Stack>
                        </Card>
                    </Stack>
                </Grid.Col>
            </Grid>
            <TokensTable DataTable={DataTable} />
            <ListTokenForm />
            <Text>
                Using next js checkout https://vercel.com/guides/react-context-state-management-nextjs
            </Text>
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