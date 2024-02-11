import { createTheme, MantineProvider } from '@mantine/core';
import { ReactNode } from 'react';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications'

import { MantineColorsTuple } from '@mantine/core';



const customPurple: MantineColorsTuple = [
    '#f3ebff',
    '#e2d1fb',
    '#c39ef9',
    '#a267f8',
    '#873bf7',
    '#7621f7',
    '#6d15f8',
    '#5c0bdd',
    '#5206c5',
    '#4600ad'
];

const deepBlue: MantineColorsTuple = [
    "#eeeefc",
    "#d8d7f3",
    "#acace9",
    "#7f7ddf",
    "#5a56d7",
    "#433ed3",
    "#3731d2",
    "#2a25ba",
    "#2420a6",
    "#1b1b93"
]

const pinkish: MantineColorsTuple = [
    "#fdecff",
    "#f1d7fb",
    "#deacf0",
    "#ca7fe5",
    "#ba59dc",
    "#b040d7",
    "#ab33d5",
    "#9626bd",
    "#851fa9",
    "#751595"
]


const theme = createTheme({
    fontFamily: "Space Grotesk, sans-serif",
    colors: {
        customPurple,
        deepBlue,
        pinkish
    }
});

interface ICustomMantineProvider {
    children: ReactNode
}
const CustomMantineProvider = (props: ICustomMantineProvider) => {
    const { children } = props

    return (
        <MantineProvider theme={theme} forceColorScheme='dark'>
            <ModalsProvider>
                <Notifications />
                {children}
            </ModalsProvider>
        </MantineProvider>
    )
}

export default CustomMantineProvider