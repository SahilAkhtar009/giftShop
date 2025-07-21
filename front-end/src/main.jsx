import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Components/Home.jsx";
import Product from "./Components/Product.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import Login from "./Components/Login.jsx";
import ProductDetailsPage from "./Components/ProductDetailsPage.jsx";
import CartPage from "./Components/CartPage.jsx";
import { RegisterPage } from "./Components/RegisterPage.jsx";
import CheckoutPage from "./Components/CheckoutPage.jsx";
import { OrderSuccessPage } from "./Components/OrderSuccessPage.jsx";
import { MyOrdersPage } from "./Components/MyOrdersPage.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";
import AdminUsersPage from "./Components/AdminUsersPage.jsx";
import AdminProductsPage from "./Components/AdminProductsPage.jsx";
import AdminOrdersPage from "./Components/AdminOrdersPage.jsx";
import AddProductPage from "./Components/AddProductPage.jsx";
import DataProvider from "./context/DataProvider.jsx";
import EditProductPage from "./Components/EditProductPage.jsx";
import SingleOrderPage from "./Components/SingleOrder.jsx";
import SingleCheckOut from "./Components/SingleCheckOut.jsx";
import WishlistPage from "./Components/WishlistPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Product />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage />,
      },
      {
        path: "/single-product/:id",
        element: <SingleOrderPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/single-checkout/:id",
        element: <SingleCheckOut />,
      },
      {
        path: "/order-success",
        element: <OrderSuccessPage />,
      },
      {
        path: "/my-orders",
        element: <MyOrdersPage />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/users",
        element: <AdminUsersPage />,
      },
      {
        path: "/admin/products",
        element: <AdminProductsPage />,
      },
      {
        path: "/admin/orders",
        element: <AdminOrdersPage />,
      },
      {
        path: "/admin/products/create",
        element: <AddProductPage />,
      },
      {
        path: "/admin/products/edit/:id",
        element: <EditProductPage />,
      },
      {
        path: "/wishlist",
        element: <WishlistPage />,
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
);
