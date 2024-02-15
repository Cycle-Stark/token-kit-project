import { TokenKitWrapper } from 'starknet-tokenkit'

import CustomMantineProvider from './layouts/CustomMantineProvider';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';

import '@mantine/core/styles.layer.css';
import ListToken from './pages/ListToken';
import ViewTokens from './pages/ViewTokens';

function App() {

  return (
    <BrowserRouter>
      <CustomMantineProvider>
        <TokenKitWrapper usingMantine={false} primaryColor='violet' theme='dark'>
          <MainLayout>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/list-token' element={<ListToken />} />
              <Route path='/view-tokens' element={<ViewTokens />} />
            </Routes>
          </MainLayout>
        </TokenKitWrapper>
      </CustomMantineProvider>
    </BrowserRouter>
  )
}

export default App
