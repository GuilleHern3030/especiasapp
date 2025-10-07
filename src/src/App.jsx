import { RouterProvider } from 'react-router-dom'
import { basename } from './data/references.json'
import './App.css'

import useGoogleSheets from './hooks/useGoogleSheets'
import useRoutes from './hooks/useRoutes'

export default function App() {

  //useGoogleSheets() // load GoogleSheets links from json
  //useData() // load data from json

  const routes = useRoutes()

  return <RouterProvider router={routes}/>
}
