import { convertToCurrency } from "@/utils/convertPrice";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { InputNumber, Table, Row, Col } from "antd";
import { removeItem, setQuantityItem } from "@/redux/cart";
import { DeleteOutlined } from "@ant-design/icons";
import "@/style/cart.scss";
import { titleTxt } from "@/redux/title";
const { VITE_BASE_URL } = import.meta.env;
const ProductTable = (props) => {
  const { dataSource = [], options = { edit: true, buttonCTA: null } } = props;
  const dispatch = useDispatch();
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
            <Link
              to={`/detail/${item?.attributes?.slug}`}
              onClick={() => {
                dispatch(titleTxt("Chi tiết sản phẩm"));
              }}
            >
              <img
                className="thumbnail"
                src={imgProduct}
                alt={item?.attributes?.name}
              />
            </Link>
            <div>
              <Link
                to={`/detail/${item?.attributes?.slug}`}
                onClick={() => {
                  dispatch(titleTxt("Chi tiết sản phẩm"));
                }}
              >
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
          <span className="old-price">{convertToCurrency(item?.oldPrice)}</span>{" "}
          - <span className="price">{convertToCurrency(item?.price)}</span>
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
                disabled={!options.edit}
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
  ];
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  if (options?.edit) {
    columns.push({
      title: "Xóa",
      responsive: ["md"],
      render: (item) => (
        <DeleteOutlined
          onClick={() => {
            handleRemoveItem(item?.id);
          }}
        />
      ),
    });
  }

  return (
    <>
      {dataSource ? (
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
      <Row className="sumary" justify={"end"} align={"middle"}>
        <Col>{options?.buttonCTA}</Col>
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

export default ProductTable;
