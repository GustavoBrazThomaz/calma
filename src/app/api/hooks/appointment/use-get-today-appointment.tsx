import { useQuery } from "@tanstack/react-query";
import { getTodayAppointments } from "../../services/appointment.service";

export function useGetTodayAppointment() {
  const userId = window.sessionStorage.getItem("userId");

  const appointment = useQuery({
    queryKey: ["fetchTodayAppointment"],
    queryFn: async () => {
      if (!userId) return;
      const response = await getTodayAppointments(userId);
      return response;
    },
  });

  return { ...appointment };
}
