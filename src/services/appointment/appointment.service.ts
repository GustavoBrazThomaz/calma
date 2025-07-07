import dayjs from "dayjs";
import { patientsDetails } from "../../mocks/patient-detail.mock";
import type { Appointment } from "../../types/appointment";
import type { AppointmentForm } from "../../ui/forms/appointment/appointment.types";
import { appointments } from "./../../mocks/appointment.mock";

export async function getAppointment(): Promise<Appointment[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(appointments);

      reject({ code: 404, message: "Paciente não encontrado" });
    }, 500);
  });
}

export async function getTodayAppointment(): Promise<Appointment[]> {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));

  const todayAppointments: Appointment[] = appointments
    .filter(({ scheduled }) => {
      const date = new Date(scheduled);
      return date >= startOfDay && date <= endOfDay;
    })
    .sort(
      (a, b) =>
        new Date(a.scheduled).getTime() - new Date(b.scheduled).getTime()
    );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(todayAppointments);

      reject({ code: 404, message: "Consulta não encontrada" });
    }, 500);
  });
}

export async function postCreateNewAppointment(appointment: AppointmentForm) {
  const scheduledDate = appointment.date;
  const scheduledTime = appointment.scheduled_time;
  const combinedDate = dayjs(
    `${scheduledDate} ${scheduledTime}`,
    "YYYY-MM-DD HH:mm"
  ).toDate();
  const newId = crypto.randomUUID();

  const patient = patientsDetails.find((p) => p.id === appointment.patient);

  if (!patient) return;

  appointments.push({
    id: newId,
    patientId: patient.id,
    firstName: patient.firstName,
    lastName: patient.lastName,
    phone: patient.phone,
    scheduled: combinedDate,
    status: "scheduled",
    paymentType: patient.paymentType,
    isPaid: false,
    price: patient.price,
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(appointments);
      reject({ code: 404, message: "Consulta não encontrada" });
    }, 500);
  });
}

export async function putToggleIsPaidById(id: string) {
  appointments.map((appointment) =>
    appointment.id === id
      ? { ...appointment, isPaid: !appointment.isPaid }
      : appointment
  );

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(appointments);
      reject({ code: 404, message: "Consulta não encontrada" });
    }, 500);
  });
}

export async function deleteAppointmentById(id: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = appointments.findIndex(
        (appointment) => appointment.id === id
      );

      if (index === -1) {
        reject({ code: 404, message: "Consulta não encontrada" });
        return;
      }

      appointments.splice(index, 1);
      resolve(appointments);
    }, 500);
  });
}

export async function getPatientAppointment(
  patientId: string
): Promise<Appointment[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patientAppointments = appointments.filter(
        (appointment) => appointment.patientId === patientId
      );

      if (patientAppointments) {
        resolve(patientAppointments);
      }

      reject({ code: 404, message: "Consultas não encontradas" });
    }, 500);
  });
}

export async function getSearchAppointment(
  search: string
): Promise<Appointment[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchLower = search.toLowerCase();
      const result = appointments.filter((patient) => {
        const fullName =
          `${patient.firstName} ${patient.lastName}`.toLowerCase();
        return fullName.includes(searchLower);
      });
      resolve(result);
    }, 500);
  });
}
