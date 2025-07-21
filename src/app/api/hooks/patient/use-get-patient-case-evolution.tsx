import { useQuery } from "@tanstack/react-query";
import { getPatientCaseEvolutions } from "../../services/case-evolution.service";

export function useGetPatientCaseEvolution(patientId: string) {
  const caseEvolution = useQuery({
    queryKey: ["fetchPatientCaseEvolution", patientId],
    queryFn: async () => {
      const response = await getPatientCaseEvolutions(patientId);
      return response;
    },
  });

  return { ...caseEvolution };
}
