import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "@/customhook/useFetching";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Col, Row, Button, InputNumber, Form } from "antd";
import { convertToCurrency } from "@/utils/convertPrice";
import "@/style/detail.scss";
import Markdown from "react-markdown";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/cart";
import ProductList from "./ProductList";
const { VITE_BASE_URL } = import.meta.env;
const ProductDetail = () => {
  const param = useParams();
  const { data } = useFetch(VITE_BASE_URL + "/api/products/" + param.slug);
  const brand = data?.attributes?.idBrand?.data?.attributes?.name;
  let listImage = data?.attributes?.image?.data.map((item) => {
    return {
      original: VITE_BASE_URL + item?.attributes?.url,
      thumbnail: VITE_BASE_URL + item?.attributes?.formats?.thumbnail?.url,
    };
  });
  let contentBody = data?.attributes?.description?.replaceAll(
    "](/uploads/",
    "](" + VITE_BASE_URL + "/uploads/"
  );
  let categories = data?.attributes?.idCategories?.data;
  let queryWithCategories = categories?.reduce((txt, item, index) => {
    return (
      txt +
      `&filters[idCategories][slug][$in][${index}]=${item?.attributes?.slug}`
    );
  }, `filters[slug][$ne]=${param.slug}`);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const addCart = () => {
    let cart = document.querySelector("#cart");
    let menuIcon = document.querySelector("#menu-icon");
    let anchor = null;
    if (window.innerWidth < 768) {
      anchor = menuIcon.getBoundingClientRect();
    } else {
      anchor = cart.getBoundingClientRect();
    }
    let posCart = {
      y: anchor.top,
      x: anchor.left,
    };
    let imgProduct = document.querySelector(".image-gallery-image");
    let imgProductClone = imgProduct.cloneNode();
    let time = 1.2;
    imgProductClone.style.cssText = `
            position: fixed;
            top: 200px;
            left: 300px;
            width: 100px;
            height: 100px;
            z-index: 999;
            transform: translate(-50%, -50%);
            transition: all ${time}s ease-in-out;
        `;
    document.body.appendChild(imgProductClone);

    setTimeout(() => {
      imgProductClone.style.width = `50px`;
      imgProductClone.style.height = `50px`;
      imgProductClone.style.left = `${posCart.x}px`;
      imgProductClone.style.top = `${posCart.y}px`;
    });
    setTimeout(() => {
      imgProductClone.remove();
      dispatch(
        addItem({
          id: data?.id,
          quantity: form.getFieldValue("quantity"),
          quantityAvailable: data?.attributes?.quantityAvailable,
        })
      );
    }, time * 1000);
  };
  return (
    <>
      <Row gutter={[50, 20]} className="product">
        <Col xs={24} md={18}>
          <Row gutter={[40, 20]}>
            <Col xs={24} md={12}>
              {listImage ? <ImageGallery items={listImage} /> : null}
            </Col>
            <Col xs={24} md={12} className="info">
              <div>
                <h1 className="title">{data?.attributes?.name}</h1>
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
                  <span className="label-field">CPU: </span>{" "}
                  {data?.attributes?.cpu}
                </div>
              ) : null}
              {data?.attributes?.ram ? (
                <div>
                  <span className="label-field">RAM: </span>{" "}
                  {data?.attributes?.ram}
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
                    <Form form={form}>
                      <Form.Item name="quantity" initialValue={1}>
                        <InputNumber
                          min={1}
                          max={data?.attributes?.quantityAvailable || 1}
                        />
                      </Form.Item>
                    </Form>
                    <div className="d-flex justify-content-around my-3">
                      <Button onClick={addCart}> Add to Cart</Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          nav("/cart");
                        }}
                      >
                        {" "}
                        Go to Cart
                      </Button>
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
          <ProductList
            title="Sản phẩm liên quan"
            query={queryWithCategories}
            pageSize={4}
          />
        </Col>
        <Col xs={24} md={6}>
          {brand ? (
            <ProductList
              title="Sản phẩm cùng hãng"
              query={`filters[idBrand][name]=${brand}&filters[slug][$ne]=${param.slug}`}
              showPagination={false}
              pageSize={4}
              type="column"
            />
          ) : (
            "Không có sản phẩm nào cùng hãng"
          )}
        </Col>
    
      </Row>
    </>
  );
};

export default ProductDetail;
