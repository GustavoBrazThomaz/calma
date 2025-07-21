import type { CaseEvolution } from "../../../domain/types";
import { supabase } from "../config";

export async function getCaseEvolutionById(
  caseId: string
): Promise<CaseEvolution> {
  const { data, error } = await supabase
    .from("case_evolutions")
    .select("id, title, note, patient_id")
    .eq("id", caseId)
    .single();

  if (error || !data) {
    console.error("Erro ao buscar evolução de caso", error);
    throw new Error("Erro ao buscar evolução de caso");
  }

  return {
    id: data.id,
    patientId: data.patient_id,
    title: data.title,
    note: data.note,
  };
}

export async function postCreateCaseEvolution({
  title,
  note,
  patientId,
}: {
  title: string;
  note: string;
  patientId: string;
}) {
  const userId = window.sessionStorage.getItem("userId");
  await supabase.from("case_evolutions").insert({
    title,
    note,
    patient_id: patientId,
    psychologist_id: userId,
  });
}

export async function putUpdateCaseEvolutionById({
  id,
  title,
  note,
}: {
  id: string;
  title: string;
  note: string;
}) {
  await supabase
    .from("case_evolutions")
    .insert({
      title,
      note,
    })
    .eq("id", id);
}

export async function getPatientCaseEvolutions(
  patientId: string
): Promise<CaseEvolution[]> {
  const userId = window.sessionStorage.getItem("userId");
  const { data, error } = await supabase
    .from("case_evolutions")
    .select("id, title, note, patient_id")
    .eq("patient_id", patientId)
    .eq("psychologist_id", userId);

  if (error || !data) {
    console.error("Erro ao buscar evoluções de caso", error);
    return [];
  }

  const caseEvolution: CaseEvolution[] = data.map((item) => ({
    id: item.id,
    patientId: item.patient_id,
    title: item.title,
    note: item.note,
  }));

  return caseEvolution;
}
