import { useQuery } from "@tanstack/react-query";
import { getSearchAppointment } from "./appointment.service";

export function useSearchAppointment(search: string) {
  const searchAppointment = useQuery({
    queryKey: ["searchAppointment", search],
    queryFn: async () => {
      const response = await getSearchAppointment(search);
      return response;
    },
    enabled: !!search,
  });

  return { ...searchAppointment };
}
