import { useQuery } from "@tanstack/react-query";
import { getPatients } from "../../services/patient.service";

export function useGetPatients({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) {
  const patients = useQuery({
    queryKey: ["fetchPatients", page],
    queryFn: async () => {
      const response = await getPatients(page, limit);
      return response;
    },
  });

  return { ...patients };
}
