import React from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "@/Components/Product/ProductTable";
import { Button, Col, Row } from "antd";
import { useFetch } from "@/customHook/useFetching";

const OrderList = () => {
  const nav = useNavigate();
  let { data } = useFetch(`/my-orders`);
  const listOrderDataSource = data?.map((order) => {
    let dataSource = order?.attributes?.items?.map((item) => {
      let product = item?.product?.data;
      return {
        ...product,
        product: item?.id,
        key: item?.id,
        quantity: item?.quantity,
        price: item?.price,
        totalPrice: item?.totalPrice,
      };
    });
    return {
      id: order?.id,
      dataSource,
    };
  });
  return (
    <div>
      <h1>Lịch sử mua hàng</h1>
      <Row>
        {listOrderDataSource?.map(({ id, dataSource }) => {
          return (
            <Col key={id} span={24}>
              <ProductTable
                dataSource={dataSource}
                options={{
                  edit: false,
                  buttonCTA: (
                    <Button
                      onClick={() => {
                        nav(`/order/${id}`);
                      }}
                    >
                      Xem đơn {id}
                    </Button>
                  ),
                }}
              />
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default OrderList;
