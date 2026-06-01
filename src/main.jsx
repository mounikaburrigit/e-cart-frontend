import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'

import {
  GoogleOAuthProvider,
} from '@react-oauth/google'

import './index.css'

import App from './App.jsx'

createRoot(
  document.getElementById('root')
).render(
  <StrictMode>

    <GoogleOAuthProvider
      clientId="336961685811-p95gelp9g6st6j6q6eg30qvm77uc7rgl.apps.googleusercontent.com"
    >
      <App />
    </GoogleOAuthProvider>

  </StrictMode>
)