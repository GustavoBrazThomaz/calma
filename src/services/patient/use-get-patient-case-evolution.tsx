import { useQuery } from "@tanstack/react-query";
import { getPatientCasesEvolution } from "./patient.service";

export function useGetPatientCaseEvolution(patientId: string) {
  const caseEvolution = useQuery({
    queryKey: ["fetchPatientCaseEvolution", patientId],
    queryFn: async () => {
      const response = await getPatientCasesEvolution(patientId);
      return response;
    },
  });

  return { ...caseEvolution };
}
