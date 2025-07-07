import { useMutation } from "@tanstack/react-query";
import {
  deleteAppointmentById,
  postCreateNewAppointment,
  putToggleIsDoneById,
  putToggleIsPaidById,
} from "./appointment.service";

export function useAppointment() {
  const newAppointment = useMutation({
    mutationFn: postCreateNewAppointment,
  });

  const toggleIsPaidById = useMutation({
    mutationFn: putToggleIsPaidById,
  });

  const toggleIsDoneById = useMutation({
    mutationFn: putToggleIsDoneById,
  });

  const deleteAppointment = useMutation({
    mutationFn: deleteAppointmentById,
  });

  return {
    newAppointment,
    toggleIsPaidById,
    toggleIsDoneById,
    deleteAppointment,
  };
}
