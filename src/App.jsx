import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashboard from "./pages/adminDashboard";
import Login from "./pages/login";
import UserDashboard from "./pages/UserDashboard";
import { useAuthContext } from "./hooks/useAuthContext";



const Body = () => {

  const { user } = useAuthContext();
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: user ? <UserDashboard /> : <Login />,
    },
    {
      path: "/adminDashboard",
      element: user ? <AdminDashboard /> : <Login />,
    },
    {
      path: "/login",
      element: !user ? (
        <Login />
      ) : user.role == "ADMIN" ? (
        <AdminDashboard />
      ) : (
        <UserDashboard />
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
};

export default Body;
