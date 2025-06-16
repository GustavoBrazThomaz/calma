import { createBrowserRouter } from "react-router";
import App from "../App";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Appointments } from "../pages/appointments/appointments";
import { Patients } from "../pages/patients/patients";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "consultas", element: <Appointments /> },
      { path: "pacientes", element: <Patients /> },
    ],
  },
]);
