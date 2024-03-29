import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Skeleton, Row, Col, Breadcrumb } from "antd";
import { useFetch } from "@/customHook/useFetching";
import "@/style/cart.scss";
import ProductTable from "@/Components/Product/ProductTable";
const Cart = () => {
  const productList = useSelector((state) => state.cart.productList);
  const token = useSelector((state) => state.auth.token);
  const nav = useNavigate();
  let query = productList?.reduce((txt, item, index) => {
    return txt + `filters[id][$in][${index}]=${item.id}&`;
  }, "");

  let { data, loading } = useFetch(`/products`, query);
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
      title: <Link to="#">Giỏ hàng</Link>,
    },
  ];
  return (
    <>
      {loading ? (
        loadingElement
      ) : (
        <div className="px-3">
          <Breadcrumb items={breadcrumbItems} style={{paddingBottom:'15px'}} />
          <ProductTable
            dataSource={dataSource}
            options={{
              edit: true,
              buttonCTA: (
                <Button
                  disabled={!dataSource?.length}
                  onClick={() => {
                    nav("/checkout");
                    if (!token) {
                      alert("Bạn chưa đăng nhập");
                    }
                  }}
                >
                  Thanh toán
                </Button>
              ),
            }}
          />
        </div>
      )}
    </>
  );
};

export default Cart;
