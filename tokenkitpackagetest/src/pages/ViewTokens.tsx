import { Container, Stack, Title } from '@mantine/core'
import { DataTable } from 'mantine-datatable'
import { TokensTable } from 'starknet-tokenkit'

const ViewTokens = () => {
    return (
        <Container size={"xl"}>
            <Stack>
                <Title size={'42px'}>View all Listed tokens</Title>
                <TokensTable DataTable={DataTable} />
            </Stack>
        </Container>
    )
}

export default ViewTokens