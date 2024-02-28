import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "@/customhook/useFetching";
import ProductTable from "@/Components/Product/ProductTable";
import { Col, Row, Skeleton ,Steps} from "antd";
const OrderDetail = () => {
  const param = useParams();
  let { data, loading } = useFetch(`/orders/${param.id}`);
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
  let loadingElement = (
    <>
      <Row gutter={[15, 15]} justify="space-between">
        <Col span={24}>
          <Skeleton.Image active />
          <Skeleton.Input active />
          <Skeleton title active />
        </Col>
      </Row>
      <Row gutter={[15, 15]} justify="space-between">
        <Col span={24}>
          <Skeleton.Image active />
          <Skeleton.Input active />
          <Skeleton title active />
        </Col>
      </Row>
      <Row gutter={[15, 15]} justify="space-between">
        <Col span={24}>
          <Skeleton.Image active />
          <Skeleton.Input active />
          <Skeleton title active />
        </Col>
      </Row>
    </>
  );
  let statusOrderComponent = null
  switch (data?.attributes?.status) {
      case 'new':
          statusOrderComponent = 0;
          break;
      case 'confirmed':
          statusOrderComponent = 1;
          break;
      case 'done': 
          statusOrderComponent = 2;
          break;
      case 'cancelled': 
          statusOrderComponent = <h1>Đơn hàng đã bị chủ Shop huỷ</h1>
          break;
      case 'boom':
          statusOrderComponent = <h1>Đơn hàng đã bị Khách hàng huỷ</h1>
          break;
      default:
          statusOrderComponent = <h1>Đơn hàng chưa được cập nhật trạng thái</h1>
          break;
  }

  if(typeof statusOrderComponent == 'number'){
      statusOrderComponent = (
          <Steps
              current={statusOrderComponent}
              items={[
              {
                  title: 'Đơn mới',
              },
              {
                  title: 'Đã xác nhận',
              },
              {
                  title: 'Hoan thanh',
              }
              ]}
          />
      )
  }
  return (
    <>
      {loading ? (
        loadingElement
      ) : (
          <div>
            {statusOrderComponent}
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
      )}
    </>
  );
};

export default OrderDetail;
