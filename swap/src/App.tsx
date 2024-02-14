import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TokenKitWrapper } from 'starknet-tokenkit'
import SelectToken from './assets/components/selectToken'

function App() {
  const [count, setCount] = useState(0)

  return (
    <TokenKitWrapper usingMantine={false}>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <input style={{
          padding: '6px',
          borderRadius: '15px',
          background: 'red',
          border: '2px solid white',
          fontWeight: 500,
          fontSize: '14px',
          color: 'yellow'
        }} />
      </div>
      <SelectToken />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </TokenKitWrapper>
  )
}

export default App
