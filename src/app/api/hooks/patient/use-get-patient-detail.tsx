import { useQuery } from "@tanstack/react-query";
import { getPatientDetail } from "../../services/patient.service";

export function useGetPatientDetail(id: string, enabled: boolean) {
  const patientDetail = useQuery({
    queryKey: ["fetchPatientDetail", id],
    queryFn: async () => {
      const response = await getPatientDetail(id);
      return response;
    },
    staleTime: 0,
    enabled: enabled,
  });

  return { ...patientDetail };
}
