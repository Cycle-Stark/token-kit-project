import { Box, Card, Container, useMantineTheme } from '@mantine/core'
import { ListTokenForm } from '../components/forms/forms'

const ListToken = () => {
    const theme = useMantineTheme()

    return (
        <Container size={"md"}>
            <Card radius={'lg'} shadow='lg' p={{ md: '50px' }} bg={theme.colors.violet[9]}>
                <Box p={'sm'}>
                    <ListTokenForm />
                </Box>
            </Card>
        </Container>
    )
}

export default ListToken