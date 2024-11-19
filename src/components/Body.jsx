import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import LoginRegister from './LoginRegister/LoginRegister';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "/userDashboard",
        element: <UserDashboard/>,
      },
      {
        path: "/adminDashboard",
        element: <AdminDashboard/>,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginRegister />,
  },
]);

const Body = () => {
  return (
    <>
        <RouterProvider router = {browserRouter}/>
    </>
  )
}

export default Body