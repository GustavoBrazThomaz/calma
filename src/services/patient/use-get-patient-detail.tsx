import { useQuery } from "@tanstack/react-query";
import { getPatientDetail } from "./patient.service";

export function useGetPatientDetail(id: string) {
  const patientDetail = useQuery({
    queryKey: ["fetchPatientDetail", id],
    queryFn: async () => {
      const response = await getPatientDetail(id);
      return response;
    },
    staleTime: 0,
  });

  return { ...patientDetail };
}
