import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage'
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import BgVideo from "./static/bg-video.mp4"
import MainPageVideo from "./components/MainPageVideo";
import AdminConsole from "./components/AdminConsole";

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children:[
      {
        path:"/",
        element : <MainPageVideo videoSrc={BgVideo} show={true} />,

      },
      {
        path:"/console",
        element : <AdminConsole />,
      }
    ]
  },
]);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);