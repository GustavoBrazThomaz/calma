import { useState, type ReactNode } from "react";
import { Avatar, Flex, Layout, Menu, Typography } from "antd";
import { menuItems } from "./contants";

const { Sider, Content } = Layout;
const { Title } = Typography;

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout>
      <Sider
        theme="light"
        style={{ height: "100vh" }}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        collapsible={true}
      >
        <Flex
          align="center"
          style={{
            marginBottom: collapsed ? "0.6rem" : "0",
            marginLeft: "1.5rem",
          }}
        >
          <Flex align="center" gap="small">
            <Avatar
              size={32}
              src="/calma.png"
              shape="square"
              style={{ marginTop: collapsed ? "0.6rem" : "0" }}
            />
            {!collapsed && (
              <Title style={{ marginTop: "0.8rem" }} level={4}>
                Calma
              </Title>
            )}
          </Flex>
        </Flex>

        <Menu mode="inline" defaultSelectedKeys={["1"]} items={menuItems} />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100vh",
            background: "#fff",
            borderRadius: "16px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
