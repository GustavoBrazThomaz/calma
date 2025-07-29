import {
  Avatar,
  Button,
  Flex,
  Grid,
  Layout,
  Menu,
  Space,
  Typography,
} from "antd";
import { type ReactNode } from "react";
const { Content, Header } = Layout;
const { Title } = Typography;

import {
  CalendarOutlined,
  HomeOutlined,
  LogoutOutlined,
  MoonOutlined,
  SunOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router";
import { getKeyByPathname } from "../../app/utils/get-key-by-pathname";
import { useAuth } from "../../app/api/hooks/auth/use-auth";
import { useThemeController } from "../context/theme-context";

type MenuItem = Required<MenuProps>["items"][number];

export function AppLayout({ children }: { children: ReactNode }) {
  const { mode, toggleTheme } = useThemeController();
  const { signOut } = useAuth();
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

  const { md, lg, xxl } = Grid.useBreakpoint();
  const isDarkTheme = mode === "dark" ? true : false;
  const themedBackground = !isDarkTheme ? "#fff" : "#141414";
  const themedLayoutBackground = !isDarkTheme ? "" : "#141414";

  return (
    <Layout style={{ background: themedLayoutBackground, width: "100%" }}>
      <Header
        style={{
          padding: "0 1rem",
          background: themedBackground,
        }}
      >
        <Flex
          align="center"
          justify="space-between"
          style={{
            margin: md ? "0 1.5rem" : "0",
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

            <Title
              style={{
                marginTop: "0.8rem",
                fontFamily: "Playfair Display, serif",
              }}
              level={4}
            >
              Calma
            </Title>
          </Flex>

          <Space>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                toggleTheme();
              }}
              icon={!isDarkTheme ? <SunOutlined /> : <MoonOutlined />}
            />

            <Button
              onClick={() => signOut.mutate()}
              color="danger"
              variant="outlined"
              icon={<LogoutOutlined />}
              iconPosition="end"
            >
              Sair
            </Button>
          </Space>
        </Flex>
      </Header>

      <Menu
        style={{ paddingLeft: md ? "1.5rem" : "0" }}
        mode="horizontal"
        defaultSelectedKeys={getKeyByPathname(location.pathname) ?? ["1"]}
        items={menuItems}
      />
      <Content
        style={{
          margin: xxl ? "2rem 8rem" : md ? "2rem" : "0",
          padding: lg ? "2rem" : md ? "2rem" : "1rem",
          background: themedBackground,
          minHeight: !md ? "calc(100dvh - 6.9rem)" : "calc(100vh - 10.9rem)",
          height: "100%",
          borderRadius: "16px",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
}
