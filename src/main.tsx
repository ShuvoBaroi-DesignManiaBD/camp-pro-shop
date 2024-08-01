import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Routes from './routes/routes.tsx';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={Routes}/>
  </React.StrictMode>,
)
