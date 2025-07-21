import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "../../services/appointment.service";

export function useGetAppointment() {
  const userId = window.sessionStorage.getItem("userId");
  const appointment = useQuery({
    queryKey: ["fetchAppointment"],
    queryFn: async () => {
      if (!userId) return;
      const response = await getAppointment(userId);
      return response;
    },
  });

  return { ...appointment };
}
