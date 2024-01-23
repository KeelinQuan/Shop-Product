import { useState, useEffect } from "react";
import axios from "axios";

export function useBrand(url) {
    const [brand, setBrand] = useState([]);
    useEffect(() => {
      axios({
        url: url,
      }).then((res) => {
        setBrand(res?.data?.data);
      });
    }, []);
    return { brand, setBrand };
}
export function useCategori(url) {
  const [categori, setCategori] = useState([])
  useEffect(() => {
    axios({
      url: url,
    }).then((res) => {
      setCategori(res?.data?.data);
    });
  }, []);
  return { categori, setCategori };
}

export function useMenu(url) {
  const [menu, setMenu] = useState([])
  useEffect(() => {
    axios({
      url: url,
    }).then((res) => {
      setMenu(res?.data?.data);
    });
  }, []);
  return { menu, setMenu };
}

export const searchProductByName = async (txt) => {
    const response = await axios.get(`/products?populate=*&pagination[page]=1&pagination[pageSize]=5&filters[name][$contains]=${txt}`);
    return response.data;
}