import { createBrowserRouter } from "react-router-dom" ;
import { lazy } from 'react';

const Home = lazy(()=> import( "@/layout/Home" ));
const BaseLayout = lazy(()=> import( "@/layout/BaseLayout" ));
const BlockProduct = lazy(()=> import( "@/Components/Product/BlockProduct" ));
const Cart = lazy(()=> import( "@/pages/Cart" ));
const ProductDetail = lazy(()=> import( "@/Components/Product/ProductDetail" ));
const Checkout = lazy(()=> import( "@/pages/Checkout" ));
const OrderDetail = lazy(()=> import( "@/pages/Order/OrderDetail" ));
const OrderList = lazy(()=> import( "@/pages/Order/OrderList" ));
const PrivateRouter = lazy(()=> import( "./PrivateRouter" ));

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
        element: (
          <PrivateRouter>
            <Checkout />
          </PrivateRouter>
        ),
      },
      {
        path: "/order/:id",
        element: (
          <PrivateRouter>
            <OrderDetail />,
          </PrivateRouter>
        ),
      },
      {
        path: "/list-order",
        element: (
          <PrivateRouter>
            <OrderList />
          </PrivateRouter>
        ),
      },
    ],
  },
]);
