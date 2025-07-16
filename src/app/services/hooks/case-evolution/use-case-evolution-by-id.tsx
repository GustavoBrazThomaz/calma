import { useQuery } from "@tanstack/react-query";
import { getCaseEvolutionById } from "../../case-evolution.service";

export function useCaseEvolutionById(id: string) {
  const caseEvolution = useQuery({
    queryKey: ["fetchCaseEvolutionById", id],
    queryFn: async () => {
      const response = await getCaseEvolutionById(id);
      return response;
    },
  });

  return { ...caseEvolution };
}
