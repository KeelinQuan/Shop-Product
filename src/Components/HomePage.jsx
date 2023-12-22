import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "./Meta";

import { Button, Col, Row, Card, Layout } from "antd";

const HomePage = () => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const nav = useNavigate();
  const { page } = useParams(1);
  const [pagePanigation, setPagePanigation] = useState(1);

  useEffect(() => {
    axios({
      url:
        `https://backoffice.nodemy.vn/api/products?populate=*&pagination[pageSize]=5&pagination[page]=` +
        pagePanigation,
      method: "GET",
    })
      .then((res) => {
        setData(res.data.data);
        setMeta(res.data.meta);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, pagePanigation]);

  const { Meta } = Card;

  return (
    <>
      <h1>Product</h1>

      <Row gutter={[16, 16]}>
        {data.map((item) => {
          const formattedGia = new Intl.NumberFormat("vi-VN", {
            currency: "VND",
          }).format(item?.attributes?.price);

          return (
            <Col key={item?.id}>
              <Card
                hoverable
                style={{
                  width: 200,
                }}
                cover={
                  <img
                    alt="ảnh"
                    src={`https://backoffice.nodemy.vn${item?.attributes?.image?.data[0]?.attributes?.url}`}
                  />
                }
              >
                <Meta
                  style={{ marginBottom: "10px" }}
                  title={item?.attributes?.name}
                />
                <Meta
                  style={{ marginBottom: "10px" }}
                  title={"Giá: " + formattedGia + " VND"}
                />
                <Button
                  
                  type="primary"
                  onClick={() => {
                    nav(`/detail/${item.attributes?.slug}`);
                  }}
                >
                  Buy now
                </Button>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Page  meta={meta} setPagePanigation={setPagePanigation} />
    </>
  );
};

export default HomePage;
