import { FilterOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { Button, Row, Col, Input, Select, Form } from "antd";
import { useFetch } from "@/customhook/useFetching";
import { useSearchParams } from "react-router-dom";
const FilterProduct = (props) => {
  const {
    name,
    setName,
    categories,
    setCategories,
    sortPrice,
    setSortPrice,
    setPriceCondition,
    search,
  } = props;

  const { data: brand } = useFetch("/brands");
  const listBrand = brand.map((item) => ({
    label: item?.attributes?.name,
    value: item?.attributes?.name,
  }));

  const { data: categori } = useFetch("/categories");
  const listCategori = categori.map((item) => ({
    label: item?.attributes?.name,
    value: item?.attributes?.slug,
  }));
  const [form] = Form.useForm();
  const [query, setQuery] = useSearchParams();

  //hứng query trên url
  const getQueryToObj = () => {
    let resual = {};
    query.forEach((value, key) => {
      resual[key] = value;
    });
    return resual;
  };
  //thêm query vào url
  const handleChangeBrand = (value) => {
    setName(value);
    let queryObj = getQueryToObj();
    queryObj.brand = value;
    setQuery(queryObj);
  };
  const handleChangeCategori = (value) => {
    setCategories(value);
    let queryObj = getQueryToObj();
    queryObj.categories = value;
    setQuery(queryObj);
  };

  const handleChangePrice = (value) => {
    setSortPrice(value);
    let queryObj = getQueryToObj();
    queryObj.sort = value;
    setQuery(queryObj);
  };
  const handleChangeMinMaxPrice = (value) => {
    setPriceCondition(value);
    let queryObj = getQueryToObj();
    if (value.min) {
      queryObj.min = value.min;
    } else {
      delete queryObj.min;
    }
    if (value.max) {
      queryObj.max = value.max;
    } else {
      delete queryObj.max;
    }
    setQuery(queryObj);
  };

  const handleChangeDelete = () => {
    setName();
    setCategories();
    setSortPrice();
    setPriceCondition({
      min: "",
      max: "",
    });
    form.resetFields();
    setQuery("");
  };

  return (
    <>
      <div className="px-3">
        <Row justify={"center"}>
          <Col>
            <h3>
              <FilterOutlined />
              Filter Products
              <FilterOutlined />
            </h3>
          </Col>
        </Row>

        <h5>Lọc sản phẩm</h5>
        <Row justify={"space-between"} className="mt-3 mb-2">
          <Col xs={12} md={12}>
            <Select
              onClear={handleChangeDelete}
              style={{ width: "200px" }}
              placeholder="Hãng sản xuất"
              onChange={(value) => {
                handleChangeBrand(value);
              }}
              value={name}
              options={listBrand}
            />
          </Col>
          <Col xs={12} md={12}>
            <Select
              onClear={handleChangeDelete}
              style={{ width: "200px" }}
              placeholder="Danh mục sản phẩm"
              onChange={(value) => {
                handleChangeCategori(value);
              }}
              value={categories}
              options={listCategori}
            />
          </Col>
        </Row>
        <h5>Sắp xếp theo giá</h5>
        <Row className="mt-3 mb-2">
          <Col>
            <Select
              onClear={handleChangeDelete}
              onChange={(value) => {
                handleChangePrice(value);
              }}
              style={{ width: "200px" }}
              placeholder="Sắp xếp"
              value={sortPrice}
              options={[
                {
                  label: "Giá tăng dần",
                  value: "asc",
                },
                {
                  label: "Giá giảm dần",
                  value: "desc",
                },
              ]}
            />
          </Col>
        </Row>
        <h5>Lọc theo giá tiền</h5>
        <Row className="mt-3 mb-2">
          <Col>
            <Form form={form} onFinish={handleChangeMinMaxPrice}>
              <Row justify={"center"}>
                <Col xs={11} md={11}>
                  <Form.Item name="min">
                    <Input placeholder="Min" />
                  </Form.Item>
                </Col>
                <Col xs={1} md={1}>
                  <ArrowRightOutlined />
                </Col>
                <Col xs={12} md={12}>
                  <Form.Item name="max">
                    <Input placeholder="Max" />
                  </Form.Item>
                </Col>
              </Row>
              <Button htmlType="submit">Lọc</Button>
            </Form>
          </Col>
        </Row>

        <Button className="mt-3" onClick={handleChangeDelete}>
          Reset All
        </Button>
      </div>
      <div className="search-result">
        {search ? (
          <h1>Tìm kiếm: {search}</h1>
        ) : name ? (
          <h1> Sản phẩm: {name}</h1>
        ) : null}
      </div>
    </>
  );
};

export default FilterProduct;
