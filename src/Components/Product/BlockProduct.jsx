import React, { useState } from "react";
import FilterProduct from "../Filter/FilterProduct";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";
import { Row, Col } from "antd";
const BlockProduct = () => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState();
  const [sortPrice, setSortPrice] = useState();
  const [priceCondition, setPriceCondition] = useState({
    min: "",
    max: "",
  });
  const [childData, setChildData] = useState({});
  const [query, setQuery] = useSearchParams();

  var queryFilterTxt = "";

  let search = query.get("name");
  if (search) {
    queryFilterTxt += `&filters[name][$contains]=${search}`;
  }

  if (name) {
    queryFilterTxt = `&filters[idBrand][name]=${name}`;
  }
  if (categories) {
    queryFilterTxt += `&filters[idCategories][slug]=${categories}`;
  }
  if (sortPrice) {
    queryFilterTxt += `&sort[1]=price:${sortPrice}`;
  }
  if (priceCondition.min && priceCondition.max) {
    queryFilterTxt += `&filters[price][$between][=${priceCondition.min}&filters[price][$between]=${priceCondition.max}`;
  }
  return (
    <>
      <Row>
        <Col xs={24} md={8}>
          <FilterProduct
            name={name}
            setName={setName}
            categories={categories}
            setCategories={setCategories}
            sortPrice={sortPrice}
            setSortPrice={setSortPrice}
            setPriceCondition={setPriceCondition}
            search={search}
            childData={childData}
            setChildData={setChildData}
          />
        </Col>
        <Col xs={24} md={16}>
          <ProductList query={queryFilterTxt} setQuery={setQuery} />
        </Col>
      </Row>
    </>
  );
};

export default BlockProduct;
