import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import UserDashboard from "./pages/userDashboard";
import AdminDashboard from "./pages/adminDashboard";
import Login from "./pages/login";
Login
const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserDashboard />,
  },
  {
    path: "/adminDashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const Body = () => {
  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
};

export default Body;
