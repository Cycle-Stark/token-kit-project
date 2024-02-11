
import { AppShell, Box, Burger, Container, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';
import ConnectWalletBtn from '../components/ConnectWalletBtn';



interface IMainLayout {
    children: ReactNode
}

export default function MainLayout(props: IMainLayout) {
    const [opened, { toggle }] = useDisclosure();
    const { children } = props
    return (
        <Box className='custom-bg' pos={'relative'} style={{ zIndex: 1 }}>
            <Box style={{
                background: '#75159552',
                position: 'fixed',
                bottom: '-250px',
                left: '-250px',
                zIndex: -1,
                filter: 'blur(20px)',
                borderRadius: '50%'
            }} h={500} w={500} />
            <AppShell
                zIndex={2}
                header={{ height: { base: 70, md: 70, lg: 70 } }}
                navbar={{
                    width: { base: 200, md: 300, lg: 400 },
                    breakpoint: 'sm',
                    collapsed: { mobile: true, desktop: true },
                }}
            >
                <AppShell.Header style={{
                    background: 'rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(5px)',
                    WebkitBackdropFilter: 'blur(5px)',
                }} withBorder={false}>
                    <Group h="100%" px="md" justify='space-between'>
                        <Group h="100%" px="md">
                            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                            <Title order={2}>TokenKit</Title>
                        </Group>
                        <Group h="100%" px="md">
                            <ConnectWalletBtn />
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Main>
                    <Container size={'xl'}>
                        {children}
                        <Box h={'1000px'} />
                    </Container>
                </AppShell.Main>
            </AppShell>
        </Box >
    );
}