import { Box, Card, Container } from '@mantine/core'
import { ListTokenForm } from 'starknet-tokenkit'

const ListToken = () => {
    return (
        <Container size={"md"}>
            <Card radius={'lg'} shadow='lg' p={{ md: '50px' }}>
                <Box p={'sm'}>
                    <ListTokenForm />
                </Box>
            </Card>
        </Container>
    )
}

export default ListToken