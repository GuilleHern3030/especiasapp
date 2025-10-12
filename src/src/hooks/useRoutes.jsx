import { createBrowserRouter } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

import options from '../data/references.json'

// Routes
import Home from '../routes/home/Home'
import Contact from '../routes/contact/Contact'
import About from '../routes/about/About'
import Ticket from '../routes/ticket/Ticket'
import Content from '../components/table/content/Content'
import ErrorRoute from '../routes/error/Error'
import Privacy from '../routes/privacy/Privacy'

export default function useRoutes() {
    return createBrowserRouter([
      {
      path: "*",
      //element: <ErrorRoute/>
      element: <Navigate to="/" replace />
    },
    {
      path: "",
      element: <Home/>,
      errorElement: <ErrorRoute/>,
      children:[
        {
          path:'/table/:id',
          element:<Content/>
        }
      ]
    },
    {
      path: "/privacy",
      element: <Privacy/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/contact",
      element: <Contact/>
    },
    {
      path: "ticket",
      errorElement: <ErrorRoute/>,
      element: <Ticket/>
    }
  ], options)
}