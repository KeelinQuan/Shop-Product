import React, { useEffect } from "react";
import { useFetch } from "@/customhook/useFetching";
import { Button, Row, Col, Pagination, Card, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { convertToCurrency } from "@/utils/convertPrice";
const ProductList = (props) => {
  const { Meta } = Card;
  const { data, paging, setPaging, loading } = useFetch(
    "/products",
    props.query
  );
  useEffect (()=>{
    if(typeof props.transferDataToParent === 'function'){
        transferDataToParent({data, paging, setPaging, loading}) 
    }
}, [data, paging, setPaging, loading])
  const nav = useNavigate();
  let loadingElement = (
    <Row gutter={[15, 15]} justify="space-between">
      <Row gutter={[0, 15]} className="skeleton-container">
        <Col span={24}>
          <Skeleton.Image active />
        </Col>
        <Col span={24}>
          <Skeleton.Input active />
        </Col>
        <Col span={24}>
          <Skeleton title active />
        </Col>
      </Row>
      <Row gutter={[0, 15]} className="skeleton-container">
        <Col span={24}>
          <Skeleton.Image active />
        </Col>
        <Col span={24}>
          <Skeleton.Input active />
        </Col>
        <Col span={24}>
          <Skeleton title active />
        </Col>
      </Row>
      <Row gutter={[0, 15]} className="skeleton-container">
        <Col span={24}>
          <Skeleton.Image active />
        </Col>
        <Col span={24}>
          <Skeleton.Input active />
        </Col>
        <Col span={24}>
          <Skeleton title active />
        </Col>
      </Row>
      <Row gutter={[0, 15]} className="skeleton-container">
        <Col span={24}>
          <Skeleton.Image active />
        </Col>
        <Col span={24}>
          <Skeleton.Input active />
        </Col>
        <Col span={24}>
          <Skeleton title active />
        </Col>
      </Row>
    </Row>
  );

  if (loading) {
    return loadingElement;
  } else {
    return (
      <>
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-12 fw-bolder">{props.productlist}</h1>
            <hr />
          </div>
        </div>
        <Row gutter={[16, 40]} className="mt-3">
          {data?.map((item, index) => {
            return (
              <Col sm={24} md={6} key={index}>
                  <Link to={ `/detail/${item.attributes?.slug}`}/>
                <Card
                  hoverable
                  style={{
                    width: "100%",
                  }}
                  cover={
                    <img
                      src={`https://backoffice.nodemy.vn${item?.attributes?.image?.data[0]?.attributes?.url}`}
                      className="card-img-top"
                      height="250px"
                    />
                  }
                >
                  <Meta
                    style={{ marginBottom: "10px" }}
                    title={item?.attributes?.name}
                  />
                  <Meta
                    style={{
                      marginBottom: "10px",
                      textDecoration: "line-through",
                    }}
                    title={
                      "Giá cũ: " + convertToCurrency(item?.attributes?.oldPrice)
                    }
                  />
                  <Meta
                    style={{ marginBottom: "10px" }}
                    title={
                      "Giá mới: " + convertToCurrency(item?.attributes?.price)
                    }
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
        <Pagination
          className="text-center mt-5"
          current={paging.page}
          pageSize={paging.pageSize}
          total={paging.total}
          onChange={(page) => {
            setPaging({
              ...paging,
              page: page,
            });
          }}
        />
      </>
    );
  }
};

export default ProductList;
