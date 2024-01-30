import { convertToCurrency } from "@/utils/convertPrice";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputNumber, Empty, Button, Table, Row, Col } from "antd";
import { useFetch } from "@/customHook/useFetching";
import { removeItem, setQuantityItem } from "@/redux/cart";
import { DeleteOutlined } from "@ant-design/icons";
import "@/style/cart.scss";
const { VITE_BASE_URL } = import.meta.env;
const Cart = () => {
  const productList = useSelector((state) => state.cart.productList);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

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
  const columns = [
    {
      title: "Tên sản phẩm",
      render: (item) => {
        let imgProduct =
          item?.attributes?.image?.data[0]?.attributes?.formats?.thumbnail?.url;
        imgProduct = imgProduct ? VITE_BASE_URL + imgProduct : "";
        let max = item?.attributes?.quantityAvailable;
        return (
          <div className="info">
            <Link to={`/detail/${item?.attributes?.slug}`}>
              <img
                className="thumbnail"
                src={imgProduct}
                alt={item?.attributes?.name}
              />
            </Link>
            <div>
              <Link to={`/detail/${item?.attributes?.slug}`}>
                <h3>{item?.attributes?.name}</h3>
              </Link>
              <div className="show-on-mobile">
                <div>
                  <span className="old-price">
                    {convertToCurrency(item?.attributes?.oldPrice)}
                  </span>{" "}
                  -{" "}
                  <span className="price">
                    {convertToCurrency(item?.attributes?.price)}
                  </span>
                </div>
                <InputNumber
                  defaultValue={item?.quantity}
                  min={1}
                  max={max}
                  onChange={(value) => {
                    dispatch(
                      setQuantityItem({
                        id: item?.id,
                        quantity: value,
                        quantityAvailable: max,
                      })
                    );
                  }}
                ></InputNumber>
                <p>Còn: {max}</p>
                <p className="money">
                  {convertToCurrency(item.quantity * item?.attributes?.price)}
                </p>
                <DeleteOutlined
                  onClick={() => {
                    handleRemoveItem(item?.id);
                  }}
                />
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "attributes",
      responsive: ["md"],
      render: (item) => (
        <div>
          <span className="old-price">{convertToCurrency(item.oldPrice)}</span>{" "}
          - <span className="price">{convertToCurrency(item.price)}</span>
        </div>
      ),
    },
    {
      title: "Số lượng",
      responsive: ["md"],
      render: (item) => {
        let max = item?.attributes?.quantityAvailable;
        return (
          <Row gutter={[0, 10]}>
            <Col span={24}>
              <InputNumber
                defaultValue={item?.quantity}
                min={1}
                max={max}
                onChange={(value) => {
                  dispatch(
                    setQuantityItem({
                      id: item?.id,
                      quantity: value,
                      quantityAvailable: max,
                    })
                  );
                }}
              />
            </Col>
            <Col span={24}>
              <span>Còn: {max}</span>
            </Col>
          </Row>
        );
      },
    },
    {
      title: "Thành tiền",
      responsive: ["md"],
      render: (item) => (
        <p className="money">
          {convertToCurrency(item.quantity * item?.attributes?.price)}
        </p>
      ),
    },
    {
      title: "Xoá",
      responsive: ["md"],
      render: (item) => (
        <DeleteOutlined
          onClick={() => {
            handleRemoveItem(item?.id);
          }}
        />
      ),
    },
  ];
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-5">
        <div className="container py-4">
          <div className="row">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
          </div>
        </div>
      </div>
    );
  };

  const cartItems = () => {
    return (
      <>
        {data ? (
          <Table
            className="cart-table"
            rowClassName="product"
            pagination={false}
            dataSource={dataSource}
            columns={columns}
          />
        ) : (
          <Row justify={"center"} align={"middle"}>
            <h3 style={{ padding: 10 }}>Chưa có sản phẩm nào</h3>
            <Link to="/">Quay về trang chủ</Link>
          </Row>
        )}
      </>
    );
  };

  return (
    <>
      <Row>
        <Col sm={24} md={24} className="display-6 fw-bold my-3">
          Shoping Cart
        </Col>
        <Col sm={24} md={24}>
          {!token && productList?.length === 0 && emptyCart()}
          {productList?.length !== 0 && cartItems()}
        </Col>
      </Row>
      <Row className="sumary" justify={"end"} align={"middle"}>
        <Col>
          <Button>Thanh toan</Button>
        </Col>
        <Col>
          <h3 className="money">
            {convertToCurrency(
              dataSource?.reduce((total, item) => {
                return total + Number(item?.attributes?.price) * item?.quantity;
              }, 0)
            )}
          </h3>
        </Col>
      </Row>
    </>
  );
};

export default Cart;
