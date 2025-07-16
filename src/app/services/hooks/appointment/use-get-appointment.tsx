import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "../../appointment.service";

export function useGetAppointment() {
  const appointment = useQuery({
    queryKey: ["fetchAppointment"],
    queryFn: async () => {
      const response = await getAppointment();
      return response;
    },
  });

  return { ...appointment };
}
