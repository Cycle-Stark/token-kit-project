import { proxy } from 'valtio'

export const landingDb = proxy({
    defaultThemeObj: {
        "textColor": "rgba(255, 255, 255, 1)",
        "headerFooterBg": "rgba(0, 0, 0, 0.1)",
        "backgroundColor": "rgba(35, 14, 99, 1)",
        "fontFamily": "Space Grotesk, sans-serif",
        "searchBackground": "rgba(0, 0, 0, 0.1)",
        "searchColor": "black",
        "searchBorderColor": "rgba(14, 6, 46, 0)",
        "searchFocusBorderColor": "#845ef7",
        "primaryColor": "rgba(174, 0, 255, 1)",
        "r": "20px"
    }
} as any)