import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import HeaderComponent from "./Header";
import "@/style/layout.scss";
import phone from "@/assets/phone-ring.png";
import zalo from "@/assets/zalo-icon.png";
import { useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";

const BaseLayout = () => {
  const { Header, Content } = Layout;
  const title = useSelector((state) => state.title.txt);
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <div>
      <HelmetProvider>
        <Helmet>
          <title>{title}</title>
        </Helmet>
      </HelmetProvider>

      <ConfigProvider
        theme={{
          components: {
            Layout: {
              headerBg: "white",
            },
          },
        }}
      >
        <Layout>
          <Header className="header">
            <HeaderComponent />
          </Header>
          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </ConfigProvider>

      <div className="hotline-zalo-ring-wrap">
        <div className="hotline-zalo-ring">
          <div className="hotline-zalo-ring-circle"></div>
          <div className="hotline-zalo-ring-circle-fill"></div>
          <div className="hotline-zalo-ring-img-circle">
            <a
              href="https://zalo.me/g/xmtqkm948"
              target="blank"
              className="pps-btn-img"
            >
              <img className="image-zalo" src={zalo} />
            </a>
          </div>
        </div>
      </div>

      <div className="hotline-phone-ring-wrap">
        <div className="hotline-phone-ring">
          <div className="hotline-phone-ring-circle"></div>
          <div className="hotline-phone-ring-circle-fill"></div>
          <div className="hotline-phone-ring-img-circle">
            <a className="pps-btn-img">
              <img className="image-phone" src={phone} />
            </a>
          </div>
          <div className="show-phone-number">0824.064.068</div>
        </div>
      </div>
    </div>
  );
};

export default BaseLayout;
