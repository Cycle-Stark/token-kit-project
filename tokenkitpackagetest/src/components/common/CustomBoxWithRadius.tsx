import { Box } from '@mantine/core'
import { ReactNode } from 'react'

interface ICustomBoxWithRadius {
    children: ReactNode
    radius?: string
}

const CustomBoxWithRadius = (props: ICustomBoxWithRadius) => {
    const { radius, children } = props

    return (
        <Box style={{ borderRadius: radius ?? '10px', overflow: 'hidden' }} >
            {children}
        </Box>
    )
}

export default CustomBoxWithRadius
