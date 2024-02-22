import React, { useEffect } from "react";
import { useFetch } from "@/customhook/useFetching";
import { Button, Row, Col, Pagination, Card, Skeleton } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { convertToCurrency } from "@/utils/convertPrice";
import { LazyLoadImage } from "react-lazy-load-image-component";
const { VITE_BASE_URL } = import.meta.env;
const ProductList = (props) => {
  const {
    query,
    transferDataToParent,
    title,
    showPagination = true,
    pageSize = 12,
    type = "row",
  } = props;
  const { Meta } = Card;
  const { data, paging, setPaging, loading } = useFetch(
    "/products",
    query,
    pageSize
  );
  useEffect(() => {
    if (typeof transferDataToParent === "function") {
      transferDataToParent({ data, paging, setPaging, loading });
    }
  }, [data, paging, setPaging, loading]);
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
        <Row>
          <h1>{title}</h1>
        </Row>
        <Row gutter={[20, 40]} style={{ flexDirection: type }}>
          {data?.map((item, index) => {
            let imgUrl = item?.attributes?.image?.data[0]?.attributes?.url
              ? VITE_BASE_URL +
                item?.attributes?.image?.data[0]?.attributes?.url
              : "";

            return (
              <Col sm={24} md={type=='column' ? 24 : 6} key={index}>
                <Link to={`/detail/${item.attributes?.slug}`}>
                  <Card
                    hoverable
                    key={item?.id}
                    cover={<LazyLoadImage style={{width: '100%'}} src={imgUrl} />}
                    
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
                        "Giá cũ: " +
                        convertToCurrency(item?.attributes?.oldPrice)
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
                </Link>
              </Col>
            );
          })}
        </Row>
        {showPagination ? (
          <Pagination
            style={{ margin: "10px 0" }}
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
        ) : null}
      </>
    );
  }
};

export default ProductList;
