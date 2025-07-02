import { useMutation } from "@tanstack/react-query";
import { deletePatientById, postCreateNewPatient } from "./patient.service";

export function usePatient() {
  const newPatient = useMutation({
    mutationFn: postCreateNewPatient,
  });

  const deletePatient = useMutation({
    mutationFn: deletePatientById,
  });

  return {
    newPatient,
    deletePatient,
  };
}
