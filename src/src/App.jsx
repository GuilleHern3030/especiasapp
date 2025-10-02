import { useContext, useEffect } from 'react'
import { basename } from './data/routes.json'
import './App.css'

// Context
import { ArticlesContext } from './context/ArticlesContext'

// Routes
import Home from './routes/home/Home'

function App() {

  const { setCSV } = useContext(ArticlesContext)

  useEffect( () => {
    const fetchData = async () => {
      try {
        const csvURL = await fetch(`${basename}/data/data.json`)
          .then(res => res.json())
          .then(json => json.csv)
        await fetch(csvURL)
        .then(res => res.text())
        .then(csv => setCSV(csv))
      } catch (e) {
        setCSV(null);
        console.error(e);
      }
    }
    fetchData();
  }, []);

  return (
    <Home/>
  )
}

export default App
