import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import Working from './Working.jsx'
import Contact from './components/ContactUs.jsx';
import './index.css'

// This is the "Modern" Data API approach
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/working",
    element: <Working />,
  },
  {
    path: "/contactus",
    element: <Contact />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)