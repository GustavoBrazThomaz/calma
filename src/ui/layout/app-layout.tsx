import { useState, type ReactNode } from "react";
import { Avatar, Flex, Layout, Menu, Typography } from "antd";
const { Sider, Content } = Layout;
const { Title } = Typography;

import {
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getKeyByPathname } from "../../utils/get-key-by-pathname";
type MenuItem = Required<MenuProps>["items"][number];

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

export function AppLayout({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/"),
    },
    {
      key: "2",
      icon: <CalendarOutlined />,
      label: "Consultas",
      onClick: () => navigate("/consultas"),
    },
    {
      key: "3",
      icon: <TeamOutlined />,
      label: "Pacientes",
      onClick: () => navigate("/pacientes"),
    },
  ];

  return (
    <Layout>
      <Sider
        theme="light"
        style={siderStyle}
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

        <Menu
          mode="inline"
          defaultSelectedKeys={getKeyByPathname(location.pathname) ?? ["1"]}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            height: "100%",
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
