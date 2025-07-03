import dayjs from "dayjs";
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
      const patientCases = casesEvolution.filter(
        (p) => p.patientId === patientId
      );

      if (patientCases.length > 0) {
        return resolve(patientCases);
      }

      reject({ code: 404, message: "Evolução de caso não encontrada" });
    }, 500);
  });
}

export async function postCreateNewPatient(
  patient: Omit<PatientDetails, "id">
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const id = crypto.randomUUID();

      patientsDetails.push({
        ...patient,
        birthDate: dayjs(patient.birthDate).toDate(),
        id,
      });

      patients.push({
        firstName: patient.firstName,
        id,
        lastName: patient.lastName,
        birthDate: dayjs(patient.birthDate).toDate(),
        lastAppointment: new Date(),
        phone: patient.phone,
      });

      resolve({ code: 200, message: "Paciente criado com sucesso" });

      reject({ code: 404, message: "Evolução de caso não encontrada" });
    }, 500);
  });
}

export async function deletePatientById(id: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = patients.findIndex((patients) => patients.id === id);

      if (index === -1) {
        reject({ code: 404, message: "paciente não encontrado" });
        return;
      }

      patients.splice(index, 1);
      resolve(patients);
    }, 500);
  });
}
