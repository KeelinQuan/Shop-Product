import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRouter = (props) => {
  const token = useSelector((state) => state.auth.token);
  if (token) {
    return props.children;
  }
  return (
    <>
      <Navigate to={"/"} />
    </>
  );
};

export default PrivateRouter;
