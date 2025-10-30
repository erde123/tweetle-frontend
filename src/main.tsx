import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Auth0Provider } from '@auth0/auth0-react'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
    domain="dev-vkjc2qc55bwr1ikt.eu.auth0.com"
    clientId="7I7v2p9IAvmwm0L3Aunc0NiMZkpAI1aQ"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://tweetle/api"
    }}
    cacheLocation="localstorage"
    useRefreshTokens={true}
    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)