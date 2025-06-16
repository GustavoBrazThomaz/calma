import { createBrowserRouter } from "react-router";
import App from "../App";
import { Dashboard } from "../pages/dashboard/dashboard";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Dashboard /> }],
  },
]);
