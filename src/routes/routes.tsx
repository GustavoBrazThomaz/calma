import { createBrowserRouter } from "react-router";
import App from "../App";
import { Dashboard } from "../pages/dashboard/dashboard";
import { Appointments } from "../pages/appointments/appointments";
import { Patients } from "../pages/patients/patients";
import { PatientDetail } from "../pages/patient-detail/patient-detail";
import { CaseEvolutionForm } from "../pages/case-evolution-form/case-evolution-form";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "consultas", element: <Appointments /> },
      { path: "pacientes", element: <Patients /> },
      {
        path: "paciente/:id",
        element: <PatientDetail />,
      },
      { path: "paciente/:id/evolucao-de-caso", element: <CaseEvolutionForm /> },
    ],
  },
]);
