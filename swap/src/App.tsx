import { TokenKitWrapper } from 'starknet-tokenkit'

import CustomMantineProvider from './layouts/CustomMantineProvider';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Pools from './pages/Pools';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.layer.css';

import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './styles/layout.css'


function App() {

  return (
    <BrowserRouter>
      <CustomMantineProvider>
        <TokenKitWrapper usingMantine={false} primaryColor='violet' theme='dark'>
          <MainLayout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/pools' element={<Pools />} />
            </Routes>
          </MainLayout>
        </TokenKitWrapper>
      </CustomMantineProvider>
    </BrowserRouter>
  )
}

export default App
