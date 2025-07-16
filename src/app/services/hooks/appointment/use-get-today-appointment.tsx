import { useQuery } from "@tanstack/react-query";
import { getTodayAppointment } from "../../appointment.service";

export function useGetTodayAppointment() {
  const appointment = useQuery({
    queryKey: ["fetchTodayAppointment"],
    queryFn: async () => {
      const response = await getTodayAppointment();
      return response;
    },
  });

  return { ...appointment };
}
