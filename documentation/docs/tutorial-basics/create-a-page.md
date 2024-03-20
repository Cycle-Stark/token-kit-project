---
sidebar_position: 1
---

# Create a custom component
## Creating a custom component that will be used to show the selected token.

Create a preview component or a component that can be wrapped with the token modal. This component will help show the selected token and also it will act as a button to open the modal.

```tsx
import { Box, Group, Avatar, Stack, Text } from "@mantine/core"

// This can be any component, just a component to be wrapped with `SelectTokenModal` Component
const MyCustomTokenPreviewComponent = (props: any) => {
    const { token } = props
    return (
        <Box p={'sm'} style={{
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '10px',
            cursor: 'pointer'
        }}>
            <Group gap={6} align="center">
                <Avatar src={token?.icon}>
                    {limitChars(token?.symbol ?? 'ST', 2, false)}
                </Avatar>
                {
                    token ? (
                        <Stack gap={2}>
                            <Text size="sm" fw={500}>{token?.name}</Text>
                            <Text size="xs">{token?.symbol}</Text>
                        </Stack>
                    ) : <Text>Select Token</Text>
                }
            </Group>
        </Box>
    )
}
```