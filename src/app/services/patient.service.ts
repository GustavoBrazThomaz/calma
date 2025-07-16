import dayjs from "dayjs";
import type {
  Patients,
  PatientDetails,
  CaseEvolution,
} from "../../domain/types";
import {
  patientsDetails,
  patients,
  casesEvolution,
  appointments,
} from "../../domain/mocks";

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

export async function getSearchPatient(name: string): Promise<Patients[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const nameLower = name.toLowerCase();
      const result = patients.filter((patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`.toLowerCase();
        return fullName.includes(nameLower);
      });
      resolve(result);
    }, 500);
  });
}

export async function putPatientDetails({
  id,
  patient,
}: {
  id: string;
  patient: Omit<PatientDetails, "id">;
}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patientDetailIndex = patientsDetails.findIndex(
        (item) => item.id === id
      );
      const patientsIndex = patients.findIndex((item) => item.id === id);

      if (patientDetailIndex === -1 || patientsIndex === -1) {
        reject({ code: 404, message: "Não foi possível atualizar o caso" });
      }

      appointments.map((item, index) => {
        if (item.patientId === id) {
          appointments[index] = {
            ...item,
            firstName: patient.firstName,
            lastName: patient.lastName,
            phone: patient.phone,
            price: patient.price,
            paymentType: patient.paymentType,
          };
        }
      });

      patientsDetails[patientDetailIndex] = {
        ...patientsDetails[patientDetailIndex],
        ...patient,
      };

      patients[patientsIndex] = {
        ...patients[patientsIndex],
        firstName: patient.firstName,
        lastName: patient.lastName,
        birthDate: dayjs(patient.birthDate).toDate(),
        phone: patient.phone,
      };

      return resolve({
        code: 204,
        message: "Paciente atualizado com sucesso",
      });
    }, 500);
  });
}
