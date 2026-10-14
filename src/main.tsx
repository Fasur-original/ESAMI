import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered at build time, so attach to it; the dev server ships an empty root.
if (container.firstElementChild) hydrateRoot(container, app)
else createRoot(container).render(app)
