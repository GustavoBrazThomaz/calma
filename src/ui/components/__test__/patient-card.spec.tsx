import { fireEvent, screen } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { mockLayout } from "../../../app/__test__/mocks/mock-layout.spec.ignore";
import { PatientCard } from "../patient-card";
import * as reactRouter from "react-router";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof reactRouter>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();
const mockDelete = vi.fn();

const defaultProps = {
  id: "1",
  firstName: "fakeFirstName",
  lastName: "fakeLastName",
  birthDate: new Date("1999-09-15T14:30:00"),
  lastAppointment: new Date("1999-09-15T14:30:00"),
  phone: "(11) 99999-9999",
  onDelete: mockDelete,
};

describe("PatientCard", () => {
  it("redirect to patient detail page", () => {
    mockLayout(<PatientCard {...defaultProps} />);
    const button = screen.getByText("Ver detalhes");

    fireEvent.click(button);
    expect(mockNavigate).toBeCalled();
  });

  it("delete patient", () => {
    mockLayout(<PatientCard {...defaultProps} />);
    const deleteButton = screen.getByTestId("delete_button");
    fireEvent.click(deleteButton);

    const popoverConfirm = screen.getByText("Excluir");
    fireEvent.click(popoverConfirm);
    expect(mockDelete).toBeCalled();
  });
});
