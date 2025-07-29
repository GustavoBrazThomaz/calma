import { useQuery } from "@tanstack/react-query";
import { getCaseEvolutionById } from "../../services/case-evolution.service";

export function useCaseEvolutionById(id: string, enabled: boolean) {
  const caseEvolution = useQuery({
    queryKey: ["fetchCaseEvolutionById", id],
    queryFn: async () => {
      const response = await getCaseEvolutionById(id);
      return response;
    },
    enabled: enabled,
  });

  return { ...caseEvolution };
}
