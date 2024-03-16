import { Button, Card, ColorInput, CopyButton, Grid, Group, Stack, Text, Title, useMantineTheme } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IModalThemeObject, IToken, SelectTokenContainer } from "starknet-tokenkit"
import { useState } from "react"
import { IconCodeAsterix } from "@tabler/icons-react"
import randomColor from 'randomcolor'
// import colorContrast from 'contrast-color'

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
            <ColorInput radius={'md'} {...form.getInputProps(field_name)} format="rgba" withPreview />
        </Group>
    )
}

const SelectTokenModalThemeCreator = () => {
    const [SelectedToken, setSelectedToken] = useState<IToken>()
    const theme = useMantineTheme()
    const form = useForm<IModalThemeObject>({
        initialValues: {
            "textColor": "rgba(255, 255, 255, 1)",
            "modalBackground": "rgba(32, 6, 87, 1)",
            "headerFooterBackground": "rgba(0, 0, 0, 0.28)",
            "tokenBackgroundColor": "rgba(0, 0, 0, 0.06)",
            "tokenHoverColor": "rgba(0, 0, 0, 0.2)",
            "searchBackgroundColor": "rgba(0, 0, 0, 0.51)",
            "searchTextColor": "rgba(255, 255, 255, 1)",
            "searchBorderColor": "rgba(14, 6, 46, 0)"
        }
    })

    const generateModalBgColorandTextColor = () => {
        const bg = randomColor();
        // const textColor = new colorContrast()
        // console.log(textColor.contrastColor({ bgColor: bg }))
        form.setFieldValue('modalBackground', bg)
        // form.setFieldValue('textColor', textColor)
    }

    return (
        <div>
            <Grid>
                <Grid.Col span={{ md: 6 }}>
                    <Card radius={'md'} bg={theme.colors.violet[7]}>
                        <Stack gap={6}>
                            <Button onClick={generateModalBgColorandTextColor}>Generate Modal Background</Button>
                            <CustomColorInput label="Text Color" form={form} field_name="textColor" />
                            <CustomColorInput label="Modal Background" form={form} field_name="modalBackground" />
                            <CustomColorInput label="Header Footer Background" form={form} field_name="headerFooterBackground" />
                            <CustomColorInput label="Search Background" form={form} field_name="searchBackgroundColor" />
                            <CustomColorInput label="Search Text Color" form={form} field_name="searchTextColor" />
                            <CustomColorInput label="Search Border Color" form={form} field_name="searchBorderColor" />
                            <CustomColorInput label="Token Background" form={form} field_name="tokenBackgroundColor" />
                            <CustomColorInput label="Token Hover Background" form={form} field_name="tokenHoverColor" />
                            <Group justify="center">
                                <CopyButton value={JSON.stringify(form.values, null, 4)}>
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
                            <SelectTokenContainer
                                modalHeight="700px"
                                selectedToken={SelectedToken}
                                callBackFunc={setSelectedToken}
                                themeObject={form.values}
                            />
                        </Stack>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default SelectTokenModalThemeCreator