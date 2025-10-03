import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/styles/normalize.css'
import './assets/styles/scroll-design.css'
import { ArticlesContextProvider } from './context/ArticlesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ArticlesContextProvider>
      <App />
    </ArticlesContextProvider>
  </React.StrictMode>
)
