import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Row, Col, Drawer, Badge, Dropdown } from "antd";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import { logoutRedux } from "@/redux/auth";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SearchComponent from "@/Components/Search/SearchComponent";
import logo from "@/assets/logo.png";
const Header = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const count = useSelector((state) => state.cart.productList);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const itemsDropdown = [
    {
      key: "1",
      label: <Link to="#">Hồ sơ</Link>,
    },
    {
      key: "2",
      label: <Link to="/checkout">Đơn mua</Link>,
    },
    {
      key: "3",
      label: <Link to="/list-order">Lịch sử mua</Link>,
    },
  ];
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
      label: token ? (
        <Dropdown
          menu={{
            items: itemsDropdown,
          }}
          placement="bottomLeft"
          arrow
        >
          <Link to={"/"} style={{ fontWeight: "bold", fontSize: "18px" }}>
            {user?.username}
          </Link>
        </Dropdown>
      ) : (
        <Login />
      ),
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
            <img src={logo} alt="" />
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
