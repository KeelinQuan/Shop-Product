import React, { useEffect, useState } from "react";
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
    setSearch,
    childData,
    setChildData,
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
  console.log(">>check", search);
  const handleChangeBrand = (value) => {
    setName(value);
    // let queryObj = getQueryToObj();
    // queryObj.brand = value;
    // setQuery(queryObj);
  };
  const handleChangeCategori = (value) => {
    setCategories(value);
    // let queryObj = getQueryToObj();
    // queryObj.categories = value;
    // setQuery(queryObj);
  };

  const handleChangePrice = (value) => {
    setSortPrice(value);
    // let queryObj = getQueryToObj();
    // queryObj.sort = value;
    // setQuery(queryObj);
  };
  const handleChangeMinMaxPrice = (value) => {
    setPriceCondition(value);
    // let queryObj = getQueryToObj();
    // if (value.min) {
    //   queryObj.min = value.min;
    // } else {
    //   delete queryObj.min;
    // }
    // if (value.max) {
    //   queryObj.max = value.max;
    // } else {
    //   delete queryObj.max;
    // }
    // setQuery(queryObj);
  };
  // useEffect(() => {
  //   let queryObj = getQueryToObj();
  //   let defaultSort = queryObj.sort ? queryObj?.sort : "asc";
  //   let defaultBrand = queryObj.brand ? queryObj?.brand?.split(",") : [];
  //   let defaultPriceCondition = {
  //     min: queryObj.min,
  //     max: queryObj.max,
  //   };
  //   setName(defaultBrand);
  //   setSortPrice(defaultSort);
  //   setPriceCondition(defaultPriceCondition);
  // }, []);
  const handleChangeDelete = () => {
    setName();
    setCategories();
    setSortPrice();
    setPriceCondition({
      min: "",
      max: "",
    });
    form.resetFields();
  };

  return (
    <>
      <div style={{ marginBottom: "16px" }}>
        <h3 className="fw-bold mb-4">
          <FilterOutlined />
          Filter Products
          <FilterOutlined />
        </h3>
        <Row>
          <Col span={24}>
            <SearchComponent />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
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
                    console.log(">>price", value);
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

          <Col span={12}>
            <Form form={form} onFinish={handleChangeMinMaxPrice}>
              <h1>Lọc theo giá tiền</h1>
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
          {search ? <h1>Tìm kiếm: {search}</h1> : null}
          <h1>{name} Sản phẩm</h1>
        </div>
      </div>
    </>
  );
};

export default FilterProduct;
