import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useFetch } from "@/customHook/useFetching";
import "@/style/cart.scss";
import ProductTable from "../../Components/Product/ProductTable";
const Cart = () => {
  const productList = useSelector((state) => state.cart.productList);
  const nav = useNavigate();
  let query = productList?.reduce((txt, item, index) => {
    return txt + `filters[id][$in][${index}]=${item.id}&`;
  }, "");

  let { data } = useFetch(`/products`, query);
  data = productList?.length ? data : [];
  let dataSource = data?.map((item) => {
    let productFinded = productList.find((product) => product?.id === item?.id);
    let quantity = 0;
    if (productFinded) {
      quantity = productFinded.quantity;
    }
    return {
      ...item,
      key: item?.id,
      quantity: quantity,
    };
  });

  return (
    <>
      <ProductTable
        dataSource={dataSource}
        options={{
          edit: true,
          buttonCTA: (
            <Button
              onClick={() => {
                nav("/checkout");
              }}
            >
              Thanh toán
            </Button>
          ),
        }}
      />
    </>
  );
};

export default Cart;
