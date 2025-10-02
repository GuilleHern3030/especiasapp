import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ArticlesContextProvider } from './context/ArticlesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ArticlesContextProvider>
      <App />
    </ArticlesContextProvider>
  </React.StrictMode>
)
