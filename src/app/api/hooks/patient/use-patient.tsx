import { useMutation } from "@tanstack/react-query";
import {
  deletePatientById,
  postCreateNewPatient,
  putPatientDetails,
} from "../../services/patient.service";

export function usePatient() {
  const newPatient = useMutation({
    mutationFn: postCreateNewPatient,
  });

  const updatePatient = useMutation({
    mutationFn: putPatientDetails,
  });

  const deletePatient = useMutation({
    mutationFn: deletePatientById,
  });

  return {
    newPatient,
    deletePatient,
    updatePatient,
  };
}
