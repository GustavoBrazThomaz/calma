import { useQuery } from "@tanstack/react-query";
import { getSearchPatient } from "../../services/patient.service";

export function useSearchPatient(patientName: string) {
  const patients = useQuery({
    queryKey: ["searchPatient", patientName],
    queryFn: async () => {
      const response = await getSearchPatient(patientName);
      return response;
    },
    enabled: !!patientName,
  });

  return { ...patients };
}
