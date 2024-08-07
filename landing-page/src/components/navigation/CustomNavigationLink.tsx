import { Text, rem } from '@mantine/core';
import { IconEye, IconHome2, IconInfoCircle, IconPlus } from '@tabler/icons-react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export interface ICustomNavLinkProps {
    to: string
    title: string
    icon: any
    target?: string
}

export const navlinks = [
    {
        title: 'Home',
        to: '/',
        icon: <IconHome2 style={{ width: rem(14), height: rem(14) }} />
    },
    {
        title: 'List Token',
        to: '/list-token',
        icon: <IconPlus style={{ width: rem(14), height: rem(14) }} />
    },
    {
        title: 'View Tokens',
        to: '/view-tokens',
        icon: <IconEye style={{ width: rem(14), height: rem(14) }} />
    },
    {
        title: 'About',
        to: '/about',
        icon: <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />
    },
    {
        title: 'Docs',
        to: 'https://tokenkit-docs.vercel.app',
        icon: <IconInfoCircle style={{ width: rem(14), height: rem(14) }} />,
        target: '_blank'
    }
]


const CustomNavLink = ({ to, title, target }: ICustomNavLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Text component={NavLink} target={target} to={to} variant={match ? 'filled' : 'outline'} fw={500} fs={"16px"} style={theme => ({
            color: match ? theme.colors.orange[6] : "white"
        })}>
            {title}
        </Text>
    )
}

export default CustomNavLink