import { RouterProvider } from 'react-router-dom'
import './App.css'

import useRoutes from './hooks/useRoutes'

export default function App() {

  const routes = useRoutes()

  return <RouterProvider router={routes}/>
}
