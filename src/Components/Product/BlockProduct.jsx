import React, { useState } from "react";
import FilterProduct from "../Filter/FilterProduct";
import ProductList from "./ProductList";
import { useSearchParams } from "react-router-dom";

const BlockProduct = () => {
  const [name, setName] = useState();
  const [categories, setCategories] = useState();
  const [sortPrice, setSortPrice] = useState();
  const [priceCondition, setPriceCondition] = useState({
    min: "",
    max: "",
  });
  const [childData, setChildData] = useState({});
  const [search, setSearch] = useState();
  var queryFilterTxt = "";
  if (search) {
    queryFilterTxt += `&filters[name][$contains]=${search}`;
  }
  if (name) {
    queryFilterTxt = `filters[idBrand][name]=${name}`;
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
  
  console.log(">>", queryFilterTxt);
  console.log("cccccc",search);
  return (
    <>
      <FilterProduct
        name={name}
        setName={setName}
        categories={categories}
        setCategories={setCategories}
        sortPrice={sortPrice}
        setSortPrice={setSortPrice}
        setPriceCondition={setPriceCondition}
        search={search}
        setSearch={setSearch}
        childData={childData}
        setChildData={setChildData}
      />
      <ProductList query={queryFilterTxt} />
    </>
  );
};

export default BlockProduct;
