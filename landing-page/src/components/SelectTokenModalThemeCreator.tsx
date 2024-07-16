import { Button, Card, Center, ColorInput, CopyButton, Grid, Group, NumberInput, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEffect, useMemo, useState } from "react"
import { IconCodeAsterix } from "@tabler/icons-react"
import randomColor from 'randomcolor'
import { SelectTokenContainer } from "starknet-tokenkit"
import { TokenPreviewComponent } from "./SelectToken"
import { landingDb } from "../simpledb"

interface ICustomColorInput {
    label: string
    form: any
    field_name: string
}

const CustomColorInput = (props: ICustomColorInput) => {
    const { label, form, field_name } = props
    return (
        <Group align="center" justify="space-between">
            <Text fw={500} size="sm">{label}</Text>
            <ColorInput radius={'md'} {...form.getInputProps(field_name)} size="md" format="rgba" withPreview />
        </Group>
    )
}

const SelectTokenModalThemeCreator = () => {
    const [SelectedToken, setSelectedToken] = useState<any>()

    const theme = useMantineTheme()
    const form = useForm<any>({
        initialValues: {
            radius: 20,
            textColor: 'black',
            headerFooterBg: "rgba(0, 0, 0, 0.1)",
            backgroundColor: "#ffdfa8",
            fontFamily: "Space Grotesk, sans-serif",
            searchBackground: "rgba(0, 0, 0, 0.1)",
            searchColor: 'black',
            searchBorderColor: 'rgba(14, 6, 46, 0)',
            searchFocusBorderColor: theme.colors.violet[5],
            primaryColor: theme.colors.violet[5],
        }
    })

    const generateModalBgColorandTextColor = () => {
        const bg = randomColor();
        // const textColor = new colorContrast()
        // console.log(textColor.contrastColor({ bgColor: bg }))
        form.setFieldValue('backgroundColor', bg)
        // form.setFieldValue('textColor', textColor)
    }

    const getValue = () => {

        let stylingObject = structuredClone(form.values)
        let r = stylingObject.radius
        delete stylingObject.radius
        return JSON.stringify({ ...stylingObject, r: `${r}px` }, null, 4)
    }

    const tryStyle = () => {
        landingDb.defaultThemeObj = JSON.parse(getValue())
    }

    const ifChanged = useMemo(() => ({
        ...form.values
    }), [form.values])

    // useEffect(() => {
    //     tryStyle()
    // }, [ifChanged])

    return (
        <div>
            <Grid>
                <Grid.Col span={{ md: 6 }}>
                    <Card radius={'md'} bg={theme.colors.violet[7]}>
                        <Stack gap={6}>
                            <Button onClick={generateModalBgColorandTextColor}>Generate Modal Background</Button>
                            <Group align="center" justify="space-between">
                                <Text fw={500} size="sm">Border Radius</Text>
                                <NumberInput {...form.getInputProps('radius')} radius={'md'} size="md" placeholder="radius" />
                            </Group>
                            <CustomColorInput label="Text Color" form={form} field_name="textColor" />
                            <CustomColorInput label="Modal Background" form={form} field_name="backgroundColor" />
                            <CustomColorInput label="Header Footer Background" form={form} field_name="headerFooterBg" />
                            <CustomColorInput label="Search Background" form={form} field_name="searchBackground" />
                            <CustomColorInput label="Search Text Color" form={form} field_name="searchColor" />
                            <CustomColorInput label="Search Border Color" form={form} field_name="searchBorderColor" />
                            <CustomColorInput label="Search Border Color Focus" form={form} field_name="searchFocusBorderColor" />
                            <CustomColorInput label="Primary Color" form={form} field_name="primaryColor" />
                            <Group justify="center">
                                <Button onClick={tryStyle}>Try Style</Button>
                                <CopyButton value={getValue()}>
                                    {({ copied, copy }) => (
                                        <Button leftSection={<IconCodeAsterix />} color={copied ? 'violet' : 'orange'} size="sm" radius={'lg'} onClick={copy}>
                                            {copied ? 'Copied Styling' : 'Copy Styling'}
                                        </Button>
                                    )}
                                </CopyButton>
                            </Group>
                        </Stack>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ md: 6 }}>
                    <Card bg={theme.colors.violet[7]} radius={'lg'} px={'50px'}>
                        <Stack>
                            <Title order={2} ta={'center'}>Preview</Title>
                            <Center h="700px">
                                <SelectTokenContainer
                                    selectedToken={SelectedToken}
                                    callBackFunc={setSelectedToken}
                                    modalHeight="700px" />
                            </Center>
                            <TokenPreviewComponent token={SelectedToken} />
                            <Text fw={500}>
                                Above is Tokenkit container usage example
                            </Text>
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default SelectTokenModalThemeCreator