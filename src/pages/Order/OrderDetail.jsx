import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/customhook/useFetching";
import ProductTable from "@/Components/Product/ProductTable";
import { Col, Row } from "antd";
const OrderDetail = () => {
  const param = useParams();
  let { data } = useFetch(`/orders/${param.id}`);
  let dataSource = data?.attributes?.items?.map((item) => {
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
  return (
    <div>
      <h1>Đơn hàng {param.id}</h1>
      <Row>
        <Col span={24}>
          <h2>Thông tin người nhận</h2>
        </Col>
        <Col span={24}>
          <h4>Tên người nhận : {data?.attributes?.customerName}</h4>
        </Col>
        <Col span={24}>
          <h4>Địa chỉ : {data?.attributes?.address}</h4>
        </Col>
        <Col span={24}>
          <h4>Số điện thoại: {data?.attributes?.phone}</h4>
        </Col>
      </Row>

      <ProductTable
        dataSource={dataSource}
        options={{ edit: false, buttonCTA: null }}
      />
    </div>
  );
};

export default OrderDetail;
