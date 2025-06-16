import { ConfigProvider, App as AntdApp } from "antd";
import { Outlet } from "react-router";
import { AppLayout } from "./ui/layout/app-layout";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </AntdApp>
    </ConfigProvider>
  );
}

export default App;
