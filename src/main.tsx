import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { routes } from "./routes/routes.tsx";
import "@ant-design/v5-patch-for-react-19";



createRoot(document.getElementById("root")!).render(
  
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
