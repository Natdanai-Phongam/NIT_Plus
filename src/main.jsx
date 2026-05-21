import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import App from './App'
import nitTheme from './styles/theme'
import './styles/tokens.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider theme={nitTheme}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)
