import { Text, rem } from '@mantine/core';
import { IconArrowsExchange, IconHome2 } from '@tabler/icons-react';
import { NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export interface ICustomNavLinkProps {
    to: string
    title: string
    icon: any
}

export const navlinks = [
    {
        title: 'Home',
        to: '/',
        icon: <IconHome2 style={{ width: rem(14), height: rem(14) }} />
    },
    {
        title: 'Pools',
        to: '/pools',
        icon: <IconArrowsExchange style={{ width: rem(14), height: rem(14) }} />
    },
]


const CustomNavLink = ({ to, title }: ICustomNavLinkProps) => {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });

    return (
        <Text component={NavLink} to={to} variant={match ? 'filled' : 'outline'} fw={500} fs={"16px"} style={theme => ({
            color: match ? theme.colors.orange[6] : "white"
        })}>
            {title}
        </Text>
    )
}

export default CustomNavLink