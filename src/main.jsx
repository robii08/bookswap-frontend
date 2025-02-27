import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import './bootstrap.min.css'
import Contextshare from './context/Contextshare.jsx'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Contextshare>
      <Provider store={store}>
        <PayPalScriptProvider options={{ clientId: "your-client-id" }}>
          <App />
        </PayPalScriptProvider>      
      </Provider>
      </Contextshare> 
    </BrowserRouter>
  </StrictMode>,
)
