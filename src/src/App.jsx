import { RouterProvider } from 'react-router-dom'
import { basename } from './data/references.json'
import './App.css'

import useCSV from './hooks/useCSV'
import useRoutes from './hooks/useRoutes'

export default function App() {

  useCSV(`${basename}/data/data.json`)

  const routes = useRoutes()

  return <RouterProvider router={routes}/>
}
