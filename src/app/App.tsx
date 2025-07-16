import { ConfigProvider, App as AntdApp } from "antd";
import { Outlet } from "react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppLayout } from "../ui/layout/app-layout";

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
