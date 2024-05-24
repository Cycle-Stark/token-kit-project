
import SelectToken from '../components/SelectToken'
import { Box, Card, Grid, Group, Image, Stack, Text, Title, useMantineTheme } from '@mantine/core'
import { CodeHighlight, CodeHighlightTabs, InlineCodeHighlight } from '@mantine/code-highlight';
import CustomBoxWithRadius from '../components/common/CustomBoxWithRadius';
import SelectTokenModalThemeCreator from '../components/SelectTokenModalThemeCreator';
// import Modal from 'starknet-tokenkit';

const stylingObject = `{
    textColor: "black",
    headerFooterBg: "rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    fontFamily: "Space Grotesk, sans-serif",
    searchBackground: "rgba(0, 0, 0, 0.1)",
    searchColor: "black",
    searchBorderColor: "rgba(14, 6, 46, 0)",
    searchFocusBorderColor: "violet",
    primaryColor: "violet",
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
        <TokenKitWrapper 
            network="SN_MAIN" // Required - SN_MAIN | SN_SEPOLIA
            sepoliaNodeURL="https://starknet-sepolia.infura.io/v3/**********" // Required
            mainnetNodeURL="https://starknet-mainnet.infura.io/v3/******************" // Required
        >
            {children}
        </TokenKitWrapper>
    )
}

export default App
`

const selectTokenContainerCode = `
<SelectTokenContainer
    selectedToken={SelectedToken} // Pass a selected token as when creating a modal
    callBackFunc={setSelectedToken} // Pass a call back function that will update the selected token
    themeObject={stylingObject} // Pass in the styling object
    modalHeight="700px"  // Always pass the height.
/>
`

const Home = () => {
    const theme = useMantineTheme()

    return (
        <Stack>
            <Box mih={'50dvh'}>
                <Stack justify='center' className='h-100'>
                    <Image src={"/assets/images/logo/starknet.png"} w={'300px'} maw={'400px'} mx={"auto"} />
                    <Title ta={'center'} fw={700} size={'100px'}>Token Kit</Title>
                    <Text ta="center" fw={500} size='22px'>
                        Empower Your dApp: Seamlessly Load Starknet Tokens with Token Kit
                    </Text>
                    <Card bg={theme.colors.violet[7]} radius={'lg'} p={'50px'}>
                        <Stack>
                            <Title order={2} ta={'center'}>Try Me!</Title>
                            <Group justify='center'>
                                <SelectToken />
                            </Group>
                        </Stack>
                    </Card>
                </Stack>
            </Box>
            <Box>
                <Stack>
                    <Title order={2} size={'62px'} ta={'center'}>Create Your Own Modal Styling</Title>
                    <SelectTokenModalThemeCreator />
                </Stack>
            </Box>
            <Grid py={'50px'}>
                <Grid.Col span={{ md: 8 }}>
                    <Grid>
                        <Grid.Col span={{ md: 12 }}>
                            <Stack>

                                <Title order={2} size={'62px'} ta={'center'}>What is Tokenkit</Title>
                                <Text fw={500} size='md'>
                                    Tokenkit is a package that keeps track of tokens listed on the tokenkit contract and displays them through a modal and a token container while the tokens keep getting autoupdated for users of your dapp.
                                </Text>
                                <Text fw={500} size='md'>
                                    Tokenkit makes it easy to add a working modal and a container of tokens to your dapp making it easy and fast for you to focus on core business logic.
                                </Text>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <Title order={2} size={'62px'} ta={'center'}>How To</Title>
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <Stack gap={'30px'}>
                                <Title order={2}>Installation</Title>
                                <Text>
                                    To install Starknet Token Kit simply use the commands below.
                                </Text>
                                <CustomBoxWithRadius>
                                    <CodeHighlightTabs
                                        expandCodeLabel="Show full code"
                                        collapseCodeLabel="Show less"
                                        code={[
                                            { fileName: 'Yarn', code: `yarn add starknet-tokenkit`, language: 'django' },
                                            { fileName: 'Npm', code: `npm i starknet-tokenkit`, language: 'shell' },
                                        ]}
                                    />
                                </CustomBoxWithRadius>
                                <Title order={2}>Setting Up your Application</Title>
                                <Text>Starknet Token Kit exposes a <InlineCodeHighlight code='<TokenKitWrapper />' /> component that you need to wrap your app with as below. </Text>
                                <CustomBoxWithRadius>
                                    <CodeHighlight code={wrapperCode} />
                                </CustomBoxWithRadius>
                            </Stack>
                        </Grid.Col>
                        <Grid.Col span={{ md: 12 }}>
                            <Stack gap={'30px'}>
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

                                <Title order={2}>Using the SelectTokenContainer </Title>
                                <Text>
                                    Select token container allows to embed the modal in a page. This can be used in instances that you don't intend to use a modal.
                                </Text>
                                <Text>
                                    For this case, an example usage is what we have used above where we create a theme for our modal.
                                </Text>
                                <CustomBoxWithRadius>
                                    <CodeHighlight code={selectTokenContainerCode} language='tsx' />
                                </CustomBoxWithRadius>

                                {/* <Title order={2}>Next JS Setup</Title>
                                <Text>
                                    Using next js checkout <Anchor href='https://vercel.com/guides/react-context-state-management-nextjs' target='_blank'>here</Anchor>
                                </Text> */}

                            </Stack>
                        </Grid.Col>
                    </Grid>
                </Grid.Col>
                <Grid.Col span={{ md: 4 }}>
                    <Image src={'/assets/images/modal.png'} radius={'lg'} />
                </Grid.Col>
            </Grid>
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