import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Row, Col, Button, Space, Drawer, Badge } from "antd";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useWindowSize } from "@uidotdev/usehooks";
import { logoutRedux } from "../redux/auth";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SearchComponent from "../Components/Search/SearchComponent";
const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const count = useSelector((state) => state.cart.productList);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const menuItems = [
    {
      key: 1,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: 2,
      label: <Link to="/product">Sản phẩm</Link>,
    },
    {
      key: 3,
      label: token ? user.username : <Login />,
    },
    {
      key: 4,
      label: token ? (
        <a
          onClick={() => {
            dispatch(logoutRedux());
          }}
        >
          Đăng xuất
        </a>
      ) : (
        <Register />
      ),
    },
    {
      key: 5,
      label: (
        <Link to="/cart">
          <Badge
            count={count?.length}
            overflowCount={10}
            offset={[10, 5]}
            id="cart"
          >
            <ShoppingCartOutlined style={{ fontSize: 22 }} />
          </Badge>
        </Link>
      ),
    },
  ];
  let menuHorizontal = (
    <Menu className="hide-on-mobile" mode="horizontal" items={menuItems} />
  );

  let menuVertical = (
    <Drawer
      className="drawer-menu"
      title="Basic Drawer"
      placement="left"
      onClose={onClose}
      open={open}
      style={{ width: "70%" }}
    >
      <Menu items={menuItems} />
    </Drawer>
  );

  return (
    <>
      <Row justify={"space-between"} align={"middle"}>
        <Col xs={2} md={2} className="logo">
          <Link to="/">
            <img src="/vite.svg" alt="" />
          </Link>
        </Col>
        <Col xs={16} md={10}>
          <SearchComponent />
        </Col>
        <Col xs={0} md={10}>
          {menuHorizontal}
          {menuVertical}
        </Col>
        <Col xs={2} md={2} className="show-on-mobile">
          <MenuOutlined id="menu-icon" onClick={showDrawer} />
        </Col>
      </Row>
    </>
  );
};

export default Header;
