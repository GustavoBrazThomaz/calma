import { casesEvolution } from "../../mocks/case-evolution.mock";
import { patientsDetails } from "../../mocks/patient-detail.mock";
import { patients } from "../../mocks/patient.mock";
import type { CaseEvolution } from "../../types/case-evolution";
import type { Patients } from "../../types/patient";
import type { PatientDetails } from "../../types/patient-detail";

export async function getPatients(): Promise<Patients[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(patients);

      reject({ code: 404, message: "Paciente não encontrado" });
    }, 500);
  });
}

export async function getPatientDetail(id: string): Promise<PatientDetails> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patient = patientsDetails.find((p) => p.id === id);
      if (patient) {
        resolve(patient);
      }

      reject({ code: 404, message: "Paciente não encontrado" });
    }, 500);
  });
}

export async function getPatientCasesEvolution(
  patientId: string
): Promise<CaseEvolution[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const caseEvolution = casesEvolution.find(
        (p) => p.patientId === patientId
      );
      if (caseEvolution) {
        resolve([caseEvolution]);
      }

      reject({ code: 404, message: "Evolução de caso não encontrada" });
    }, 500);
  });
}
