import { useQuery } from "@tanstack/react-query";
import { getAppointment } from "../../services/appointment.service";

export function useGetAppointment({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const userId = window.sessionStorage.getItem("userId");
  const appointment = useQuery({
    queryKey: ["fetchAppointment", page],
    queryFn: async () => {
      if (!userId) return;
      const response = await getAppointment({
        userId,
        page,
        limit,
      });
      return response;
    },
  });

  return { ...appointment };
}
