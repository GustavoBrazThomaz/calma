import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockLayout } from "../../../app/__test__/mocks/mock-layout.spec.ignore";
import { AppointmentForm } from "../appointment/appointment-form";
import * as usePatientsHook from "../../../app/api/hooks/patient/use-get-patients";
import * as useAppointmentHook from "../../../app/api/hooks/appointment/use-appointment";
import { fireEvent, screen, waitFor, within } from "@testing-library/dom";
import type { AppointmentForm as AppointmentFormType } from "../appointment/appointment.types";
import { createMutationMock } from "../../../app/__test__/utils/create-mutation";

describe("AppointmentForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("submit form", async () => {
    const setOpenMock = vi.fn();
    vi.spyOn(usePatientsHook, "useGetPatients").mockReturnValue({
      data: {
        patients: [
          {
            id: "1",
            firstName: "Maria",
            lastName: "Silva",
            birthDate: new Date("1990-01-01"),
            lastAppointment: new Date("2025-06-01"),
            phone: "99999-0000",
          },
          {
            id: "2",
            firstName: "João",
            lastName: "Souza",
            birthDate: new Date("1990-01-01"),
            lastAppointment: new Date("2025-06-01"),
            phone: "99999-0000",
          },
        ],
        total: 2,
      },
      isLoading: false,
    } as ReturnType<typeof usePatientsHook.useGetPatients>);

    const newAppointmentMock = createMutationMock<
      void,
      Error,
      AppointmentFormType
    >();

    vi.spyOn(useAppointmentHook, "useAppointment").mockReturnValue({
      newAppointment: newAppointmentMock,
      toggleIsPaidById: createMutationMock(),
      toggleIsDoneById: createMutationMock(),
      deleteAppointment: createMutationMock(),
    });

    mockLayout(<AppointmentForm open={true} setOpen={setOpenMock} />);

    const select = screen.getByTestId("select_patient");
    const selector = select.querySelector(".ant-select-selector")!;
    fireEvent.mouseDown(selector);

    const option = await within(document.body).findByText("Maria Silva");
    fireEvent.click(option);

    const dateInput = screen.getByTestId("data_picker");
    fireEvent.mouseDown(dateInput);
    fireEvent.change(dateInput, { target: { value: "10-12-2020" } });

    const timeInput = screen.getByTestId("time_picker");
    fireEvent.mouseDown(timeInput);

    const hourOption = await screen.findByText("10");
    fireEvent.click(hourOption);

    const minuteOption = await screen.findByText("10");
    fireEvent.click(minuteOption);

    const submitButton = screen.getByRole("button", { name: /salvar/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(newAppointmentMock.mutate).toHaveBeenCalled();
    });
  });
});
