import { casesEvolution } from "../../mocks/case-evolution.mock";
import type { CaseEvolution } from "../../types/case-evolution";

export function getCaseEvolutionById(id: string): Promise<CaseEvolution> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const patientAppointments = casesEvolution.filter(
        (caseEvolution) => caseEvolution.id === id
      );

      if (patientAppointments[0]) {
        resolve(patientAppointments[0]);
      }

      reject({ code: 404, message: "Consultas não encontradas" });
    }, 500);
  });
}
