import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/public/Home";
import Menu from "../pages/public/Menu";
import Reservation from "../pages/public/Reservation";
import Cart from "../pages/public/Cart";
import Checkout from "../pages/public/Checkout";
import Success from "../pages/public/Success";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import Orders from "../pages/admin/Orders";
import Reservations from "../pages/admin/Reservations";
import Menus from "../pages/admin/Menus";

import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";

const router = createBrowserRouter([
  // PUBLIC
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/reservation",
    element: <Reservation />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/success/:orderNumber",
    element: <Success />,
  },

  // ADMIN LOGIN (public)
  {
    path: "/admin/login",
    element: <Login />,
  },

  // ADMIN PROTECTED
  {
    path: "/admin",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
          {
            path: "reservations",
            element: <Reservations />,
          },
          {
            path: "menus",
            element: <Menus />,
          },
        ],
      },
    ],
  },
]);

export default router;