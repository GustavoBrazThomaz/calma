import dayjs from "dayjs";
import type { PatientDetails, Patients } from "../../../domain/types";
import { supabase } from "../config";

export async function getPatients(
  page: number,
  limit: number
): Promise<{
  patients: Patients[];
  total: number;
}> {
  const userId = window.sessionStorage.getItem("userId");
  if (!userId) return { patients: [], total: 0 };

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("patients_view")
    .select("id, first_name, last_name, birth_date, phone, last_appointment", {
      count: "exact",
    })
    .eq("psychologist_id", userId)
    .range(from, to);

  if (error || !data || count === null) {
    console.error("Erro ao buscar pacientes:", error);
    return { patients: [], total: 0 };
  }

  const patients: Patients[] = data.map((item) => ({
    id: item.id,
    firstName: item.first_name,
    lastName: item.last_name,
    birthDate: item.birth_date,
    phone: item.phone,
    lastAppointment: item.last_appointment,
  }));

  return {
    patients,
    total: count,
  };
}

export async function getPatientDetail(id: string): Promise<PatientDetails> {
  const userId = window.sessionStorage.getItem("userId");
  const { data } = await supabase
    .from("patients")
    .select("*")
    .eq("psychologist_id", userId)
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

export async function postCreateNewPatient(
  patient: Omit<PatientDetails, "id">
) {
  const userId = window.sessionStorage.getItem("userId");
  try {
    const { data } = await supabase.from("patients").insert({
      psychologist_id: userId,
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
      clinical_observations: patient.clinicalObservations,
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
  const userId = window.sessionStorage.getItem("userId");
  if (!userId) return [];

  const { data, error } = await supabase
    .from("patients_view")
    .select("id, first_name, last_name, birth_date, phone, last_appointment")
    .eq("psychologist_id", userId)
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
    lastAppointment: item.last_appointment,
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
        clinical_observations: patient.clinicalObservations,
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
