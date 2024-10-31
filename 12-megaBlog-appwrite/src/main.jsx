import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AddPost, EditPost, Home, Login, MyPost, NotFound, Post, Signup, Verification } from './pages/'
import AuthLayout from './components/AuthLayout.jsx'
import { Provider as ChakraProvider } from './components/UI/provider.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },
      {
        path: "/verification",
        element: (
          <AuthLayout authentication={false}>
            <Verification />
          </AuthLayout>
        )
      },
      {
        path: "/my-posts",
        element: (
          <AuthLayout authentication={true}>
            <MyPost />
          </AuthLayout>
        )
      },
      {
        path: "/add-post",
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        )
      },
      {
        path: "/edit-post/:slug",
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        )
      },
      {
        path: "/post/:slug",
        element: <Post />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Provider store={store} >
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>,
)
