import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../patient.service";

export function useGetPatients() {
  const patients = useQuery({
    queryKey: ["fetchPatients"],
    queryFn: async () => {
      const response = await getPatients();
      return response;
    },
  });

  return { ...patients };
}
