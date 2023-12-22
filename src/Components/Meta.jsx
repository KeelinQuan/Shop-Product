import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style/meta.scss";
const Page = ({ meta, setPagePanigation }) => {
  const page = [];
  const [active, setActive] = useState(1);
  if (meta?.pagination?.pageCount) {
    for (var i = 1; i <= meta.pagination.pageCount; i++) {
      page.push(i);
    }
  }

  return (
    <div className="page">
      {page.map((item) => {
        return (
          <Link
            className={item === active ? "active" : ""}
            onClick={() => {
              setPagePanigation(item);
              setActive(item);
            }}
            style={{
              margin: "10px",
              padding: "10px",
              border: "1px solid black",
            }}
            key={item}
            to={`/list/${item}`}
          >
            {item}
          </Link>
        );
      })}
    </div>
  );
};

export default Page;
