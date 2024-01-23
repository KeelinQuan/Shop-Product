import { createBrowserRouter } from "react-router-dom";
import Home from "../layout/Home";
import Detail from "../Components/Detail";
import Layout from "../layout/Layout";

import BlockProduct from "../Components/Product/BlockProduct";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
        element: <Detail />,
      },
      {
        path: "/test",
        element: <h1>trang cho quan ly</h1>,
      },
    ],
  },
]);
