import { Menu, ActionIcon } from '@mantine/core';
import {
    IconMenu2,
} from '@tabler/icons-react';
import { navlinks } from './CustomNavigationLink';
import { Link } from 'react-router-dom';

function SmallScreenMenu() {

    return (
        <Menu shadow="md" width={200} radius={'lg'} styles={{dropdown: {border: 'none'}}} withArrow>
            <Menu.Target>
                <ActionIcon radius={'md'} size={'lg'} variant='light' color='violet'>
                    <IconMenu2 />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown py={'lg'} bg={'#1c0070c4'}>
                <Menu.Label>Menu</Menu.Label>
                {
                    navlinks.map((link: any, i: number) => (
                        <Menu.Item key={`small_screen_${i}`} component={Link} to={link.to} leftSection={link.icon}>
                            {link.title}
                        </Menu.Item>
                    ))
                }
            </Menu.Dropdown>
        </Menu>
    );
}

export default SmallScreenMenu