import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { About, Contact, Error, Github, Home, User } from './components';
import Layout from './Layout';
import { githubInfoLoader } from './components/Github/Github';

/*
const myRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "user/:userId",
        element: <User />,
      },
      {
        path: "github",
        element: <Github />,
        loader: githubInfoLoader
      },
    ],
  },
])
*/

// For better syntax
const myRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Error />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='user/:userId' element={<User />} />
      <Route path='github' element={<Github />} loader={githubInfoLoader} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={myRouter} />
  </StrictMode>,
)
