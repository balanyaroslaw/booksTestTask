import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './routes/Router'
import { BooksProvider } from './context/book.context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BooksProvider>
      <Router/>
    </BooksProvider>
  </StrictMode>,
)
