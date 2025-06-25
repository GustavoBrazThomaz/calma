import { appointments } from "../../mocks/appointment.mock";
import type { Appointment } from "../../types/appointment";

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
