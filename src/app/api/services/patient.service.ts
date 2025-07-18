import dayjs from "dayjs";
import type {
  Patients,
  PatientDetails,
  CaseEvolution,
} from "../../../domain/types";
import { casesEvolution } from "../../../domain/mocks";
import { supabase } from "../config";

const psychologistId = window.sessionStorage.getItem("userId");

export async function getPatients(): Promise<Patients[]> {
  if (!psychologistId) return [];

  const { data, error } = await supabase
    .from("patients")
    .select("id, first_name, last_name, birth_date, phone")
    .eq("psychologist_id", psychologistId);

  if (error || !data) {
    console.error("Erro ao buscar pacientes:", error);
    return [];
  }

  const patients: Patients[] = data.map((item) => ({
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    birthDate: item.birth_date,
    phone: item.phone,
    lastAppointment: new Date(),
  }));

  return patients;
}

export async function getPatientDetail(id: string): Promise<PatientDetails> {
  const { data } = await supabase
    .from("patients")
    .select("*")
    .eq("psychologist_id", psychologistId)
    .eq("id", id)
    .single();

  const patient = data;

  return {
    id: patient.id,
    firstName: patient.first_name,
    lastName: patient.last_name,
    birthDate: dayjs(patient.birth_date).toDate(),
    phone: patient.phone,
    email: patient.email,
    religion: patient.religion,
    maritalStatus: patient.marital_status,
    address: patient.address,
    education: patient.education,
    profession: patient.profession,
    gender: patient.gender,
    sexuality: patient.sexuality,
    price: patient.price,
    paymentType: patient.payment_type,
    clinicalObservations: patient.clinical_observations,
    currentMedications: patient.current_medications,
    diagnoses: patient.diagnoses,
  };
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
  try {
    const { data } = await supabase.from("patients").insert({
      psychologist_id: psychologistId,
      first_name: patient.firstName,
      last_name: patient.lastName,
      birth_date: dayjs(patient.birthDate).toISOString(),
      phone: patient.phone,
      email: patient.email,
      religion: patient.religion,
      marital_status: patient.maritalStatus,
      address: patient.address,
      education: patient.education,
      profession: patient.profession,
      gender: patient.gender,
      sexuality: patient.sexuality,
      price: patient.price,
      payment_type: patient.paymentType,
      clinical_observations: patient.currentMedications,
      current_medications: patient.currentMedications,
      diagnoses: patient.diagnoses,
    });

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export async function deletePatientById(id: string) {
  const { data } = await supabase
    .from("patients")
    .delete({ count: "exact" })
    .eq("id", id);

  return data;
}

export async function getSearchPatient(name: string): Promise<Patients[]> {
  if (!psychologistId) return [];

  const { data, error } = await supabase
    .from("patient_view")
    .select("id, first_name, last_name, birth_date, phone")
    .eq("psychologist_id", psychologistId)
    .ilike("full_name", `%${name.toLowerCase()}%`);

  if (error || !data) {
    console.error("Erro ao buscar pacientes:", error);
    return [];
  }

  const patients: Patients[] = data.map((item) => ({
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    birthDate: item.birth_date,
    phone: item.phone,
    lastAppointment: new Date(),
  }));

  return patients;
}

export async function putPatientDetails({
  id,
  patient,
}: {
  id: string;
  patient: Omit<PatientDetails, "id">;
}) {
  try {
    const { data } = await supabase
      .from("patients")
      .update({
        first_name: patient.firstName,
        last_name: patient.lastName,
        birth_date: dayjs(patient.birthDate).toISOString(),
        phone: patient.phone,
        email: patient.email,
        religion: patient.religion,
        marital_status: patient.maritalStatus,
        address: patient.address,
        education: patient.education,
        profession: patient.profession,
        gender: patient.gender,
        sexuality: patient.sexuality,
        price: patient.price,
        payment_type: patient.paymentType,
        clinical_observations: patient.currentMedications,
        current_medications: patient.currentMedications,
        diagnoses: patient.diagnoses,
      })
      .eq("id", id);

    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
}
