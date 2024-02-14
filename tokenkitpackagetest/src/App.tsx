import { TokenKitWrapper } from 'starknet-tokenkit'

import CustomMantineProvider from './layouts/CustomMantineProvider';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/code-highlight/styles.css';

import '@mantine/core/styles.layer.css';

function App() {

  return (
    <CustomMantineProvider>
      <TokenKitWrapper usingMantine={false} primaryColor='violet' theme='dark'>
        <MainLayout>
          <Home />
        </MainLayout>
      </TokenKitWrapper>
    </CustomMantineProvider>
  )
}

export default App
