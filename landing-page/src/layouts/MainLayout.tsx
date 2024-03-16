
import { AppShell, Box, Container, Group, Image } from '@mantine/core';
import { ReactNode } from 'react';
import ConnectWalletBtn from '../components/ConnectWalletBtn';
import CustomNavLink, { navlinks } from '../components/navigation/CustomNavigationLink';
import SmallScreenMenu from '../components/navigation/SmallScreenMenu';



interface IMainLayout {
    children: ReactNode
}

export default function MainLayout(props: IMainLayout) {
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
                    <Group h="100%" px="xs" justify='space-between' gap={0}>
                        <Group h="100%" px="xs">
                            <Image src={'/assets/images/logo/logo-transparent-1.svg'} mah={'50px'} h={'80%'} />
                        </Group>
                        <Group className='h-100' visibleFrom='sm'>
                            {
                                navlinks.map((link: any, i: number) => (
                                    <CustomNavLink key={`header_${i}`} {...link} />
                                ))
                            }
                        </Group>
                        <Group h="100%" px="xs" align='center' gap={2}>
                            <SmallScreenMenu />
                            <ConnectWalletBtn />
                        </Group>
                    </Group>
                </AppShell.Header>
                <AppShell.Main>
                    <Container size={'xl'} py="50px">
                        {children}
                    </Container>
                </AppShell.Main>
            </AppShell>
        </Box >
    );
}