import { createBrowserRouter } from "react-router";
import App from "../App";
import { Appointments } from "../../pages/appointments/appointments";
import { CaseEvolutionForm } from "../../pages/case-evolution-form/case-evolution-form";
import { Dashboard } from "../../pages/dashboard/dashboard";
import { PatientDetail } from "../../pages/patient-detail/patient-detail";
import { Patients } from "../../pages/patients/patients";
import { NewPatient } from "../../pages/new-patient/patient-form";

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
      {
        path: "paciente/:id/evolucao-de-caso/:caseId",
        element: <CaseEvolutionForm />,
      },
      { path: "novo-paciente", element: <NewPatient /> },
      { path: "editar-paciente/:id", element: <NewPatient /> },
    ],
  },
]);
