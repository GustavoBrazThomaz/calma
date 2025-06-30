import { useMutation } from "@tanstack/react-query";
import { postCreateNewPatient } from "./patient.service";

export function usePatient() {
  const newPatient = useMutation({
    mutationFn: postCreateNewPatient,
  });

  return {
    newPatient,
  };
}
