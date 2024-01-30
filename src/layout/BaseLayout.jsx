import React from "react";
import { Outlet } from "react-router-dom";
import { Layout, ConfigProvider } from "antd";
import HeaderComponent from "./Header";
import "@/style/layout.scss";
const BaseLayout = () => {
  const { Header, Content } = Layout;
  return (
    <div>
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
    </div>
  );
};

export default BaseLayout;
