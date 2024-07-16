// import { TokenKitWrapper } from 'starknet-tokenkit'

import CustomMantineProvider from './layouts/CustomMantineProvider';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TokenKitWrapper from "starknet-tokenkit"
import ListToken from './pages/ListToken';
import ViewTokens from './pages/ViewTokens';

import '@mantine/dates/styles.css';

import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';

import '@mantine/core/styles.layer.css';
import 'starknet-tokenkit/dist/index.css'

import '@mantine/notifications/styles.css';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './styles/layout.css'
import About from './pages/About';
import { useSnapshot } from 'valtio';
import { landingDb } from './simpledb';

function App() {
  const snap = useSnapshot(landingDb)

  const defaultThemeObj = {
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
  return (
    <BrowserRouter>
      <TokenKitWrapper
        network="SN_SEPOLIA"
        sepoliaNodeURL="https://starknet-sepolia.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec"
        mainnetNodeURL="https://starknet-mainnet.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec"
        themeObject={snap.defaultThemeObj ?? defaultThemeObj}
      >
        <CustomMantineProvider>
          <MainLayout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/list-token' element={<ListToken />} />
              <Route path='/view-tokens' element={<ViewTokens />} />
              <Route path='/about' element={<About />} />
            </Routes>
          </MainLayout>
        </CustomMantineProvider>
      </TokenKitWrapper>
    </BrowserRouter>
  )
}

export default App
