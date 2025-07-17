import { Avatar, Button, Flex, Layout, Menu, Typography } from "antd";
import { useState, type ReactNode } from "react";
const { Sider, Content, Header } = Layout;
const { Title } = Typography;

import {
  CalendarOutlined,
  HomeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getKeyByPathname } from "../../app/utils/get-key-by-pathname";
import { useAuth } from "../../app/services/hooks/auth/use-auth";

type MenuItem = Required<MenuProps>["items"][number];

const siderStyle: React.CSSProperties = {
  overflow: "visible",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  zIndex: 1001,
};

export function AppLayout({ children }: { children: ReactNode }) {
  const [breakpoint, setBreakpoint] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

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
        onBreakpoint={(broken) => setBreakpoint(broken)}
        breakpoint="sm"
        collapsedWidth={breakpoint ? "0" : "60"}
        trigger={null}
      >
        <Flex
          align="center"
          style={{
            marginBottom: "0",
            marginLeft: "1.5rem",
          }}
        >
          <Flex align="center" gap="small">
            <Avatar
              size={32}
              src="/calma.png"
              shape="square"
              style={{
                marginTop: "0",
              }}
            />

            <Title style={{ marginTop: "0.8rem" }} level={4}>
              Calma
            </Title>
          </Flex>
        </Flex>

        <Menu
          mode="inline"
          defaultSelectedKeys={getKeyByPathname(location.pathname) ?? ["1"]}
          items={menuItems}
        />

        <div
          style={{
            position: "absolute",
            bottom: "0",
            width: "100%",
            padding: "0.5rem",
          }}
        >
          <Button
            onClick={() => signOut.mutate()}
            style={{ width: "100%" }}
            color="danger"
            variant="text"
          >
            Sair
          </Button>
        </div>
      </Sider>
      <Layout>
        {breakpoint && (
          <Header style={{ padding: "0", background: "#fff" }}>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={getKeyByPathname(location.pathname) ?? ["1"]}
              items={menuItems}
            />
          </Header>
        )}

        <Content
          style={{
            margin: breakpoint ? "16px" : "24px",
            padding: breakpoint ? "16px" : "24px",
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
