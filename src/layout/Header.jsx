import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Row, Col, Button, Space, Drawer, Radio } from "antd";
import Login from "./Login/Login";
import Register from "./Login/Register";
import "../style/header.scss";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useWindowSize } from "@uidotdev/usehooks";
import { logoutRedux } from "../redux/auth";
const Header = () => {
  const user = useSelector((state) => {
    return state.auth.user;
  });
  const token = useSelector((state) => {
    return state.auth.token;
  });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const size = useWindowSize();

  const HeaderVertical = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState("left");

    const items2 = ["Home", "Product", "Cart", "About", "Contact"].map(
      (key) => ({
        key,
        label: <h5>{key}</h5>,
      })
    );

    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
    const onChange = (e) => {
      setPlacement(e.target.value);
    };

    return (
      <>
        <Row>
          <Col xs={12} sm={12} md={12} lg={3} xl={6}>
            <h3
              className="fw-bold logo"
              style={{ margin: "15px 0px 0px 20px" }}
              onClick={() => {
                nav(`/`);
              }}
            >
              Keelin
            </h3>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={3}
            xl={6}
            style={{ textAlign: "end" }}
          >
            <Radio.Group value={placement} onChange={onChange}></Radio.Group>
            <Button
              type="text"
              icon={true ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              defaultselectedkeys={["Home"]}
              onClick={() => {
                showDrawer();
              }}
              style={{
                fontSize: "16px",
                width: 50,
                height: 50,
              }}
            />
          </Col>
          <Drawer
            title="Keelin"
            placement={placement}
            closable={false}
            onClose={onClose}
            open={open}
            key={placement}
            width={size.width <= 376 ? "calc(100% - 50px)" : null}
          >
            <Menu
              theme="light"
              mode="inline"
              defaultselectedkeys={["Home"]}
              items={items2}
              onClick={(e) => {
                const selectedKey = e.key;
                const selectedItem = items2.find(
                  (item) => item.key === selectedKey
                );
                switch (selectedItem?.key) {
                  case "Home":
                    nav(`/`);
                    break;
                  case "Product":
                  case "About":
                  case "Contact":
                    nav(`/${selectedItem.key.toLowerCase()}`);
                    break;
                  default:
                    break;
                }
              }}
            ></Menu>
            <Row
              align="end"
              style={{
                transform: "translate(20px, -10px)",
                bottom: 0,
                position: "fixed",
                paddingTop: 20,
                borderTop: "1px solid #9a9a9a",
                justifyContent: "center",
                width: 280,
              }}
            >
              <Space
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                {token ? (
                  <>
                  <Button>{user.username}</Button>
                  <Button
                  type="dashed"
                  danger
                  onClick={() => {
                    dispatch(logoutRedux());
                  }}
                >
                  Log Out
                    </Button>
                  </>
                    
                ) : (
                  <Row>
                    <Login /> <Register />
                  </Row>
                )}
                {/* <Button className="d-flex" type="primary" danger onClick={() => {
                                    nav('/cart')
                                }}>
                                    <i className="fa fa-shopping-cart"></i>Cart ({state.length})
                                </Button> */}
              </Space>
            </Row>
          </Drawer>
        </Row>
      </>
    );
  };

  const HeaderHorizontal = () => {
    const items1 = ["Home", "Product", "About", "Contact"].map((key) => ({
      key,
      label: <h5>{key}</h5>,
    }));
    return (
      <>
        <Row className="container-lg mb-5 header" justify="center">
          <Col xs={24} sm={3} md={3} lg={6} xl={8}>
            <h3
              className="fw-bold logo"
              onClick={() => {
                nav(`/`);
              }}
            >
              Keelin
            </h3>
          </Col>
          <Col xs={24} sm={8} md={11} lg={10} xl={8}>
            <Row
              style={{
                width: "100%",
              }}
            >
              <Menu
                style={{
                  flex: 4,
                }}
                theme="light"
                mode="horizontal"
                defaultselectedkeys={["Home"]}
                items={items1}
                onClick={(e) => {
                  const selectedKey = e.key;
                  const selectedItem = items1.find(
                    (item) => item.key === selectedKey
                  );
                  if (selectedItem.key === "Home") {
                    nav(`/`);
                  } else if (selectedItem) {
                    nav(`/${selectedItem.key.toLowerCase()}`);
                  }
                }}
              />
            </Row>
          </Col>
          <Col xs={24} sm={12} md={10} lg={8} xl={8}>
            <Row align="end">
              <Space align="start">
                {token ? (
                  <>
                    <Button>{user.username}</Button>
                    <Button
                      type="dashed"
                      danger
                      onClick={() => {
                        dispatch(logoutRedux());
                      }}
                    >
                      Log Out
                    </Button>
                  </>
                ) : (
                  <Row>
                    <Login /> <Register />
                  </Row>
                )}
                {/* <Button className="d-flex" type="primary" danger onClick={() => {
                                nav('/cart')
                            }}>
                                <i className="fa fa-shopping-cart"></i>Cart ({state.length})
                            </Button> */}
              </Space>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  return <>{size.width < 768 ? <HeaderVertical /> : <HeaderHorizontal />}</>;
};

export default Header;
