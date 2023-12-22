import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "antd";
const Detail = () => {
  const [data, setData] = useState({});
  const param = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: `https://backoffice.nodemy.vn/api/products/${param?.slug}`,
    })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  return (
    <div>
      {data.attributes?.image?.data.map((item) => {
        return (
          <>
            <Image.PreviewGroup
              items={[`https://backoffice.nodemy.vn${item?.attributes?.url}`]}
            >
              <Image
                width={350}
                src={`https://backoffice.nodemy.vn${item?.attributes?.url}`}
              />
            </Image.PreviewGroup>
          </>
        );
      })}
    </div>
  );
};

export default Detail;
