import { Outlet } from "react-router";
import { AppLayout } from "../ui/layout/app-layout";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <AppLayout>
      <Outlet />
      <ReactQueryDevtools initialIsOpen={false} />
    </AppLayout>
  );
}

export default App;
