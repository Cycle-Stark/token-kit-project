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

function App() {
  // console.log(window?.starknet)
  // console.log(window?.starknet_braavos)
  return (
    <BrowserRouter>
      <TokenKitWrapper
        network="SN_MAIN"
        sepoliaNodeURL="https://starknet-sepolia.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec"
        mainnetNodeURL="https://starknet-mainnet.infura.io/v3/958e1b411a40480eacb8c0f5d640a8ec"
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
