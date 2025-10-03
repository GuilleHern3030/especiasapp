import { RouterProvider } from 'react-router-dom'
import { basename } from './data/references.json'
import './App.css'

import useCSV from './hooks/useCSV'
import useArticles from './hooks/useArticles'
import useRoutes from './hooks/useRoutes'

export default function App() {

  useCSV(`${basename}/data/data.json`)
  //useArticles()

  const routes = useRoutes()

  return <RouterProvider router={routes}/>
}
