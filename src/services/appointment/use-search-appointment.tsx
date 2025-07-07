import { useQuery } from "@tanstack/react-query";
import { getSearchAppointment } from "./appointment.service";

export function useSearchAppointment({
  search,
  appointmentStatus,
  paymentStatus,
}: {
  search: string;
  appointmentStatus: string;
  paymentStatus: string;
}) {
  const searchAppointment = useQuery({
    queryKey: ["searchAppointment", search, appointmentStatus, paymentStatus],
    queryFn: async () => {
      const response = await getSearchAppointment(
        search,
        appointmentStatus,
        paymentStatus
      );
      return response;
    },
  });

  return { ...searchAppointment };
}
