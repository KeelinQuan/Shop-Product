import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import axios from "axios";



const Home = () => {
  const [image, setImage] = useState();
  // const params = useParams();

  useEffect(() => {
    axios({
      method: "get",
      url: 'https://backoffice.nodemy.vn/api/homepage?populate=*',
    })
      .then((res) => {
        setImage(res.data.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  console.log('>>check image',image);
  let listImage = image?.attributes?.leftBanner?.data.map((item) => {
    return {
      original: `https://backoffice.nodemy.vn` + item?.attributes?.url,
      // thumbnail:
      //   `https://backoffice.nodemy.vn` +
      //   item?.attributes?.formats?.thumbnail?.url,
    };
  });

  return (
    <div>
      <Link to={"/list/1"}>Page</Link>
      {listImage ? <ImageGallery items={listImage} /> : null}
    </div>
  );
};

export default Home;
