import { useQuery } from "@tanstack/react-query";
import { getPatientAppointment } from "./appointment.service";

export function useGetPatientAppointments(patientId: string) {
  const patientAppointments = useQuery({
    queryKey: ["fetchPatientAppointment"],
    queryFn: async () => {
      const response = await getPatientAppointment(patientId);
      return response;
    },
  });

  return { ...patientAppointments };
}
