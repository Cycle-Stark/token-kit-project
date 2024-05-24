import { ActionIcon, CopyButton, Tooltip } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"



interface ICustomCopyBtn {
    color: string
    copy_value: string
}

const CustomCopyBtn = (props: ICustomCopyBtn) => {
    const { color, copy_value } = props
    return (
        <CopyButton value={copy_value}>
            {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy'} >
                    <ActionIcon variant="light" size={'sm'} radius={'sm'} color={copied ? `${color}.9` : color} onClick={copy}>
                        <IconCopy />
                    </ActionIcon>
                </Tooltip>
            )}
        </CopyButton>
    )
}

export default CustomCopyBtn