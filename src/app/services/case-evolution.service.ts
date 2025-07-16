import { casesEvolution } from "../../domain/mocks/case-evolution.mock";
import type { CaseEvolution } from "../../domain/types";

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

export function postCreateCaseEvolution({
  title,
  note,
  patientId,
}: {
  title: string;
  note: string;
  patientId: string;
}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      casesEvolution.push({
        id: crypto.randomUUID(),
        title,
        note,
        patientId,
      });

      console.log(casesEvolution);

      resolve({ code: 201, message: "Evolução de caso criada com sucesso" });

      reject({ code: 404, message: "Não foi possível atualizar o caso" });
    }, 500);
  });
}

export function putUpdateCaseEvolutionById({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note: string;
}): Promise<CaseEvolution> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = casesEvolution.findIndex((item) => item.id === id);
      if (index !== -1) {
        casesEvolution[index].title = title;
        casesEvolution[index].note = note;
        return resolve(casesEvolution[index]);
      }

      reject({ code: 404, message: "Não foi possível atualizar o caso" });
    }, 500);
  });
}
