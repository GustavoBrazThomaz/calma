import { useMutation } from "@tanstack/react-query";
import {
  deleteAppointmentById,
  postCreateNewAppointment,
  putToggleIsPaidById,
} from "./appointment.service";

export function useAppointment() {
  const newAppointment = useMutation({
    mutationFn: postCreateNewAppointment,
  });

  const toggleIsPaidById = useMutation({
    mutationFn: putToggleIsPaidById,
  });

  const deleteAppointment = useMutation({
    mutationFn: deleteAppointmentById,
  });


  return {
    newAppointment,
    toggleIsPaidById,
    deleteAppointment,
  };
}
