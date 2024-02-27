import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/Home";
import BaseLayout from "../layout/BaseLayout";
import BlockProduct from "../Components/Product/BlockProduct";
import Cart from "../pages/Cart";
import ProductDetail from "../Components/Product/ProductDetail";
import Checkout from "../pages/Checkout";
import OrderDetail from "../pages/Order/OrderDetail";
import OrderList from "../pages/Order/OrderList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product",
        element: <BlockProduct />,
      },
      {
        path: "/tim",
        element: <BlockProduct />,
      },
      {
        path: "/detail/:slug",
        element: <ProductDetail />,
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
        path: "/order/:id",
        element: <OrderDetail />,
      },
      {
        path: "/list-order",
        element: <OrderList />,
      },
    ],
  },
]);
