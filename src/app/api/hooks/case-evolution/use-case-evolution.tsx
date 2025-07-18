import { useMutation } from "@tanstack/react-query";
import {
  postCreateCaseEvolution,
  putUpdateCaseEvolutionById,
} from "../../services/case-evolution.service";

export function useCaseEvolution() {
  const updateCaseEvolution = useMutation({
    mutationFn: putUpdateCaseEvolutionById,
  });

  const createCaseEvolution = useMutation({
    mutationFn: postCreateCaseEvolution,
  });

  return { updateCaseEvolution, createCaseEvolution };
}
