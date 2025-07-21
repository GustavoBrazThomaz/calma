import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "../../services/appointment.service";

export function useGetTodayAppointment() {
  const appointment = useQuery({
    queryKey: ["fetchTodayAppointment"],
    queryFn: async () => {
      const response = await getTodayAppointments();
      return response;
    },
  });

  return { ...appointment };
}
