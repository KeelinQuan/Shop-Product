import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProductTable from "@/Components/Product/ProductTable";
import { Breadcrumb, Button, Col, Row, Skeleton } from "antd";
import { useFetch } from "@/customHook/useFetching";

const OrderList = () => {
  const nav = useNavigate();
  let { data, loading } = useFetch(`/my-orders`);
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
      <Row gutter={[15, 15]} justify="space-between">
        <Col span={24}>
          <Skeleton.Image active />
          <Skeleton.Input active />
          <Skeleton title active />
        </Col>
      </Row>
    </>
  );
  let breadcrumbItems = [
    {
      title: <Link to="/">Trang chủ</Link>,
    },
    {
      title: <Link to="#">Đơn hàng</Link>,
    },
  ];
  return (
    <div className="px-3">
      <h1 className="text-primary">Lịch sử mua hàng</h1>
      <Breadcrumb items={breadcrumbItems} style={{ paddingBottom: 15 }} />
      {loading ? (
        loadingElement
      ) : (
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
      )}
    </div>
  );
};

export default OrderList;
