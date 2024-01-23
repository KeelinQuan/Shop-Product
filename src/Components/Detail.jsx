import { useParams } from "react-router-dom";
import { useFetch } from "@/customhook/useFetching";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Col, Row, Button, InputNumber } from "antd";
import { convertToCurrency } from "@/utils/convertPrice";
import "../style/detail.scss";
import Markdown from "react-markdown";

const Detail = () => {
  const param = useParams();
  const { data } = useFetch(
    "https://backoffice.nodemy.vn/api/products/" + param.slug
  );
  const brand = data?.attributes?.idBrand?.data?.attributes?.name;
  let listImage = data?.attributes?.image?.data.map((item) => {
    return {
      original: `https://backoffice.nodemy.vn` + item?.attributes?.url,
      thumbnail: `https://backoffice.nodemy.vn` + item?.attributes?.url,
    };
  });
  let contentBody = data?.attributes?.description?.replaceAll(
    "](/uploads/",
    "](https://backoffice.nodemy.vn/uploads/"
  );
  return (
    <>
      <Row gutter={[100, 20]} className="product">
        <Col xs={24} md={14}>
          {listImage ? <ImageGallery items={listImage} /> : null}
        </Col>
        <Col xs={24} md={10} className="info">
          <h1 className="title">{data?.attributes?.name}</h1>
          <div className="my-3">
            <span className="price">
              {convertToCurrency(data?.attributes?.price)}
            </span>
            <span className="old-price">
              {convertToCurrency(data?.attributes?.oldPrice)}
            </span>
            <span className="saving-money">
              Tiết kiệm:
              {convertToCurrency(
                data?.attributes?.oldPrice - +data?.attributes?.price
              )}{" "}
            </span>
          </div>

          {brand ? (
            <div>
              <span className="label-field">Thương hiệu: </span> {brand}
            </div>
          ) : null}
          {data?.attributes?.cpu ? (
            <div>
              <span className="label-field">CPU: </span> {data?.attributes?.cpu}
            </div>
          ) : null}
          {data?.attributes?.ram ? (
            <div>
              <span className="label-field">RAM: </span> {data?.attributes?.ram}
            </div>
          ) : null}
          {data?.attributes?.quantityAvailable ? (
            <div>
              <span className="label-field">Có sẵn: </span>
              {data?.attributes?.quantityAvailable}
            </div>
          ) : (
            "Hết hàng"
          )}
          {data?.attributes?.quantityAvailable ? (
            <>
              <div>
                <span className="label-field">Số lượng: </span>
                <InputNumber
                  min={1}
                  max={data?.attributes?.quantityAvailable || 1}
                  defaultValue={1}
                />
                <div className="d-flex justify-content-around my-3">
                  <Button> Add to Cart</Button>
                  <Button type="primary"> Go to Cart</Button>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Button>Liên hệ ngay</Button>
            </div>
          )}
        </Col>
      </Row>
      <div className="content-body">
        <h1>Mô tả sản phẩm:</h1>
        <Markdown>{contentBody}</Markdown>
      </div>
    </>
  );
};

export default Detail;
