import { ActionIcon, Anchor, Avatar, Card, Center, Grid, Group, Stack, Text, Title, em } from '@mantine/core'
import { limitChars } from '../configs/utils'
import { IconBrandGithub, IconBrandLinkedin, IconBrandTelegram, IconBrandTwitter } from '@tabler/icons-react'

interface ITeamMember {
    name: string
    twitter: string
    telegram: string
    linkedin: string
    github: string
    avatar: string
    role: string
}

const TeamMember = (props: ITeamMember) => {

    return (
        <Card>
            <Stack gap={10}>
                <Center>
                    <Avatar size={"120px"} tt={"uppercase"} src={props.avatar}>
                        {limitChars(props.name, 2, false)}
                    </Avatar>
                </Center>
                <Title order={4} ta={"center"}>{props.name}</Title>
                <Text c="dimmed" ta={"center"}>
                    {`${props.role}`}
                </Text>
                <Group align='center' justify='center'>
                    <Anchor href={props.twitter} target='_blank'>
                        <ActionIcon size={'lg'} radius={"md"} variant='light' >
                            <IconBrandTwitter stroke={em(1.5)} size={'22px'} />
                        </ActionIcon>
                    </Anchor>
                    <Anchor href={props.telegram} target='_blank'>
                        <ActionIcon size={'lg'} radius={"md"} variant='light' color='indigo'>
                            <IconBrandTelegram stroke={em(1.5)} size={'22px'} />
                        </ActionIcon>
                    </Anchor>
                    <Anchor href={props.github} target='_blank'>
                        <ActionIcon size={'lg'} radius={"md"} variant='light' color='orange'>
                            <IconBrandGithub stroke={em(1.5)} size={'22px'} />
                        </ActionIcon>
                    </Anchor>
                    <Anchor href={props.linkedin} target='_blank'>
                        <ActionIcon size={'lg'} radius={"md"} variant='light' color='blue'>
                            <IconBrandLinkedin stroke={em(1.5)} size={'22px'} />
                        </ActionIcon>
                    </Anchor>
                </Group>
            </Stack>
        </Card>
    )
}

const teamMembers: ITeamMember[] = [
    {
        name: "Dalmas Ogembo",
        twitter: "https://x.com/dalmasonto",
        telegram: "https://t.me/dalmasonto",
        linkedin: "https://www.linkedin.com/in/dalmas-ogembo",
        github: "https://github.com/dalmasonto",
        avatar: "/assets/images/team/dalmas.jpg",
        role: "Lead/Full-Stack Developer",
    },
    {
        name: "Onchezz Brian",
        twitter: "https://x.com/dalmasonto",
        telegram: "https://t.me/dalmasonto",
        linkedin: "https://www.linkedin.com/in/onches-muriithi",
        github: "https://github.com/onchezz/",
        avatar: "",
        role: "Frontend Engineer"
    },
    // {
    //     name: "Cynthia Kamau",
    //     twitter: "https://x.com/dalmasonto",
    //     telegram: "https://t.me/dalmasonto",
    //     linkedin: "https://www.linkedin.com/in/dalmas-ogembo",
    //     avatar: "",
    //     role: "Backend Engineer"
    // },
    {
        name: "Frank Hazard",
        twitter: "https://x.com/HazardKrypto",
        telegram: "https://t.me/Hazard_Krypto",
        linkedin: "https://www.linkedin.com/in/francis-waweru-90886b1a5",
        github: "https://github.com/iBrainiac",
        avatar: "/assets/images/team/hazard.jpeg",
        role: "Content Curator"
    },
]

const About = () => {

    const bg = "white"
    const color = "black"
    return (
        <Stack>
            <Card radius={"lg"} bg={bg}>
                <Stack>
                    <Title ta={"center"} c={color}>About Tokenkit</Title>
                    <Text c={color}>
                        Tokenkit is a package for Starknet developers that simplifies token management in decentralized finance (DeFi) applications.
                    </Text>
                    <Text c={color}>
                        It provides a comprehensive and dynamic list of tokens, enabling easy integration and interaction with these tokens within dapps.
                    </Text>
                    <Text c={color}>
                        Additionally, Tokenkit allows newly deployed tokens to be listed and made visible across all dapps using the package. This enhances user experience, streamlines development, promotes standardization, and supports the growth and scalability of the Starknet ecosystem.
                    </Text>
                </Stack>
            </Card>
            <Card radius={"lg"} bg={bg}>
                <Stack>
                    <Title ta={"center"} c={color}>Team</Title>
                    <Grid>
                        {
                            teamMembers?.map((member: ITeamMember, i: number) => (
                                <Grid.Col key={`member_${i}`} span={{ md: 4 }}>
                                    <TeamMember {...member} />
                                </Grid.Col>
                            ))
                        }
                    </Grid>
                </Stack>
            </Card>
        </Stack>
    )
}

export default About