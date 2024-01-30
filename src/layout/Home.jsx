import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useFetch } from "../customhook/useFetching";
import { Col, Row, Menu } from "antd";
import ProductList from "../Components/Product/ProductList";
import Parser from "html-react-parser";
import "bootstrap-icons/font/bootstrap-icons.css";
const { VITE_BASE_URL } = import.meta.env;
const Home = () => {
  const { data: data } = useFetch("/homepage");
  const { data: menu } = useFetch("/dropdown-tabs");
  let listImage = data?.attributes?.leftBanner?.data.map((item) => {
    return {
      original: VITE_BASE_URL + item?.attributes?.url,
    };
  });
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = menu?.map((items) => {
    return getItem(
      items?.attributes?.label,
      items?.id * 0.13,
      Parser(items?.attributes?.icon),
      items?.attributes?.section.map((i) => {
        return getItem(i?.title, i?.id * 0.3);
      })
    );
  });
  return (
    <>
      <Row style={{marginTop: 20,padding:10}}>
        <Col xs={0} xl={4}>
          <Menu
            className="menu"
            style={{
              width: "100%",
            }}
            mode="vertical"
            items={items}
          />
        </Col>
        <Col xl={20}>
          <Row>
            <Col xs={24} xl={16}>
              {listImage ? (
                <ImageGallery
                  items={listImage}
                  showNav={false}
                  showPlayButton={false}
                  autoPlay
                />
              ) : null}
            </Col>
            <Col xs={0} xl={8}>
              {data?.attributes?.rightBanner?.data.map((item) => {
                return (
                  <Row span={12} key={item?.id}>
                    <img
                      src={VITE_BASE_URL + item?.attributes?.url}
                      width="100%"
                    />
                  </Row>
                );
              })}
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
            {data?.attributes?.subBanner?.data.map((item) => {
              return (
                <Col xs={0} xl={8} key={item?.id}>
                  <img
                    src={VITE_BASE_URL + item?.attributes?.url}
                    width="100%"
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginBottom: "50px" }}>
        {data?.attributes?.bottomBanner?.data.map((item) => {
          return (
            <Col xs={0} xl={6} key={item?.id}>
              <img src={VITE_BASE_URL + item?.attributes?.url} width="100%" />
            </Col>
          );
        })}
      </Row>
      <ProductList title="Sản phẩm mới" />
      <ProductList title="Lap top gaming" query="filters[idCategories][slug]=laptop-gaming"/>
    </>
  );
};

export default Home;
