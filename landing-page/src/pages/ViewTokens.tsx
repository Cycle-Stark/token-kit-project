import { Container, Stack, Title } from '@mantine/core'
import TokensTable from '../components/TokensTable'

const ViewTokens = () => {
    return (
        <Container size={"xxl"}>
            <Stack>
                <Title size={'42px'}>View all Listed tokens</Title>
                <TokensTable />
            </Stack>
        </Container>
    )
}

export default ViewTokens