
import { Box, Card, Grid, Stack, Text, Title } from '@mantine/core'
import SwapCard from '../components/swap/SwapCard'

const Home = () => {

    return (
        <Stack>
            <Box mih={'100dvh'}>
                <Stack justify='center' align='center' className='h-100'>
                    <Title ta={'center'} fw={700} size={'100px'}>StarkDex</Title>
                    <Text ta="center" fw={500} size='22px'>Swap all tokens at a go!</Text>
                    <Grid>
                        <Grid.Col span={{ md: 2 }}></Grid.Col>
                        <Grid.Col span={{ md: 8 }}>
                            <Card radius={'lg'} shadow='lg' p={{ md: '50px' }} bg={'#411a71a1'}>
                                <Stack>
                                    <Title>Swap</Title>
                                    <Box>
                                        <SwapCard />
                                    </Box>
                                </Stack>
                            </Card>
                        </Grid.Col>
                        <Grid.Col span={{ md: 2 }}></Grid.Col>
                    </Grid>
                </Stack>
            </Box>
        </Stack>
    )
}

export default Home