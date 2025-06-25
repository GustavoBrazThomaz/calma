import { ConfigProvider, App as AntdApp } from "antd";
import { Outlet } from "react-router";
import { AppLayout } from "./ui/layout/app-layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </AntdApp>
      <ReactQueryDevtools initialIsOpen={true} />
    </ConfigProvider>
  );
}

export default App;
