import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

try {
  const savedTheme = window.localStorage.getItem('rm-theme') === 'light' ? 'light' : 'dark'
  document.documentElement.dataset.theme = savedTheme
  document.documentElement.style.colorScheme = savedTheme
} catch {
  document.documentElement.dataset.theme = 'dark'
  document.documentElement.style.colorScheme = 'dark'
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
