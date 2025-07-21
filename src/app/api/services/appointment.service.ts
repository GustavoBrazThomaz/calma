import dayjs from "dayjs";
import type { Appointment } from "../../../domain/types";
import type { AppointmentForm } from "../../../ui/forms/appointment/appointment.types";
import { supabase } from "../config";

export async function getAppointment(): Promise<Appointment[]> {
  const userId = window.sessionStorage.getItem("userId");

  const { data, error } = await supabase
    .from("appointments_view")
    .select("*")
    .eq("psychologist_id", userId);

  if (error || !data) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }

  const appointment: Appointment[] = data.map((item) => ({
    id: item.id,
    patientId: item.patient_id,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    scheduled: item.scheduled,
    paymentType: item.payment_type,
    price: item.price,
    isPaid: item.is_paid,
    isDone: item.is_done,
  }));

  return appointment;
}

export async function getTodayAppointments(): Promise<Appointment[]> {
  const userId = window.sessionStorage.getItem("userId");
  const now = new Date();

  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(now);
  endOfDay.setHours(23, 59, 59, 999);

  const { data, error } = await supabase
    .from("appointments_view")
    .select("*")
    .eq("psychologist_id", userId)
    .eq("is_done", false)
    .gte("scheduled", startOfDay.toISOString())
    .lte("scheduled", endOfDay.toISOString())
    .order("scheduled", { ascending: true })
    .limit(4);

  if (error || !data) {
    console.error("Erro ao buscar consultas do dia:", error);
    return [];
  }
  const appointment: Appointment[] = data.map((item) => ({
    id: item.id,
    patientId: item.patient_id,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    scheduled: item.scheduled,
    paymentType: item.payment_type,
    price: item.price,
    isPaid: item.is_paid,
    isDone: item.is_done,
  }));

  return appointment;
}

export async function postCreateNewAppointment(appointment: AppointmentForm) {
  const userId = window.sessionStorage.getItem("userId");
  const date = dayjs(appointment.date);
  const time = dayjs(appointment.scheduledTime);
  const combinedDate = date
    .hour(time.hour())
    .minute(time.minute())
    .second(0)
    .millisecond(0);

  await supabase.from("appointments").insert({
    psychologist_id: userId,
    patient_id: appointment.patient,
    scheduled: combinedDate.format(),
    is_done: appointment.isDone,
    is_paid: appointment.isPaid,
  });
}

export async function putToggleIsPaidById({
  id,
  isPaid,
}: {
  id: string;
  isPaid: boolean;
}) {
  const { data, error } = await supabase
    .from("appointments")
    .update({ is_paid: isPaid }, { count: "exact" })
    .eq("id", id);

  if (error) return error;

  return data;
}

export async function putToggleIsDoneById({
  id,
  isDone,
}: {
  id: string;
  isDone: boolean;
}) {
  const { data, error } = await supabase
    .from("appointments")
    .update({ is_done: isDone }, { count: "exact" })
    .eq("id", id);

  if (error) return error;

  return data;
}

export async function deleteAppointmentById(id: string) {
  const { data, error } = await supabase
    .from("appointments")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) return error;

  return data;
}

export async function getPatientAppointment(
  patientId: string
): Promise<Appointment[]> {
  const userId = window.sessionStorage.getItem("userId");
  const { data, error } = await supabase
    .from("appointments_view")
    .select("*")
    .eq("psychologist_id", userId)
    .eq("patient_id", patientId);

  if (error || !data) {
    console.error("Erro ao buscar consultas:", error);
    return [];
  }

  const appointment: Appointment[] = data.map((item) => ({
    id: item.id,
    patientId: item.patient_id,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    scheduled: item.scheduled,
    paymentType: item.payment_type,
    price: item.price,
    isPaid: item.is_paid,
    isDone: item.is_done,
  }));

  return appointment;
}

export async function getSearchAppointment(
  search: string,
  appointmentStatus: string,
  paymentStatus: string
): Promise<Appointment[]> {
  const userId = window.sessionStorage.getItem("userId");
  const query = supabase
    .from("appointments_view")
    .select("*")
    .eq("psychologist_id", userId);

  if (search) {
    query.ilike("full_name", `%${search.toLowerCase()}%`);
  }

  if (appointmentStatus === "done") {
    query.eq("is_done", true);
  } else if (appointmentStatus === "scheduled") {
    query.eq("is_done", false);
  }

  if (paymentStatus === "paid") {
    query.eq("is_paid", true);
  } else if (paymentStatus === "pending") {
    query.eq("is_paid", false);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Erro ao buscar agendamentos:", error);
    return [];
  }
  const appointment: Appointment[] = data.map((item) => ({
    id: item.id,
    patientId: item.patient_id,
    firstName: item.first_name,
    lastName: item.last_name,
    phone: item.phone,
    scheduled: item.scheduled,
    paymentType: item.payment_type,
    price: item.price,
    isPaid: item.is_paid,
    isDone: item.is_done,
  }));

  return appointment;
}
