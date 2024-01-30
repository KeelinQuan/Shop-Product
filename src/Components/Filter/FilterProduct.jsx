import { FilterOutlined } from "@ant-design/icons";
import { Button, Row, Col, Input, Select, Form } from "antd";
import { useFetch } from "@/customhook/useFetching";
import { useSearchParams } from "react-router-dom";
import SearchComponent from "../Search/SearchComponent";
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
  const getQueryToObj = () => {
    let resual = {};
    query.forEach((value, key) => {
      resual[key] = value;
    });
    return resual;
  };
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
      <div style={{ marginBottom: "16px" }}>
        <h3 className="fw-bold mb-4">
          <FilterOutlined />
          Filter Products
          <FilterOutlined />
        </h3>
        {/* <Row>
          <Col>
            <SearchComponent />
          </Col>
        </Row> */}
        <Row>
          <Col>
            <Row gutter={[15, 0]}>
              <Col>
                <Select
                  onClear={handleChangeDelete}
                  style={{ width: "140px" }}
                  placeholder="Hãng sản xuất"
                  onChange={(value) => {
                    handleChangeBrand(value);
                  }}
                  value={name}
                  options={listBrand}
                />
              </Col>
              <Col>
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
              <Col>
                <Select
                  onClear={handleChangeDelete}
                  onChange={(value) => {
                    handleChangePrice(value);
                  }}
                  style={{ width: "150px" }}
                  placeholder="Sắp xếp theo giá"
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
          </Col>

          <Col>
            <Form form={form} onFinish={handleChangeMinMaxPrice}>
              <Form.Item label="Giá thấp nhất" name="min">
                <Input placeholder="Giá min" />
              </Form.Item>
              <Form.Item label="Giá cao nhất" name="max">
                <Input placeholder="Giá max" />
              </Form.Item>
              <Button htmlType="submit">Lọc</Button>
            </Form>
          </Col>
        </Row>

        <Button onClick={handleChangeDelete}>Reset All</Button>
        <div className="search-result">
          {search ? (
            <h1>Tìm kiếm: {search}</h1>
          ) : name ? (
            <h1> Sản phẩm: {name}</h1>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
