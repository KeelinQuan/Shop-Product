import { useState, useEffect } from "react";
import axios from "axios";
export function useFetch(url, query = "") {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [reload, setReload] = useState();
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({
    page: 1,
    pageCount: 5,
    pageSize: 12,
    total: 21,
  });
  const reloadData = () => {
    setReload(!reload);
  };
  useEffect(() => {
    axios({
      url:
        url +
        `?populate=*&pagination[page]=${paging.page}&pagination[pageSize]=${paging.pageSize}&${query}`,
    })
      .then((res) => {
        setData(res?.data?.data);
        setPaging({ ...res.data?.meta?.pagination });
        setFilter(res?.data?.data);
      })
      .catch((err) => {})
      .finally(() => {
        setLoading(false);
      });
  }, [url, paging.page, paging.pageSize, reload, query]);

  return {
    data,
    setData,
    paging,
    setPaging,
    filter,
    setFilter,
    reload,
    reloadData,
    loading,
    setLoading,
  };
}
