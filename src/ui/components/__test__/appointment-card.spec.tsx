import { fireEvent, screen } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { mockLayout } from "../../../app/__test__/mocks/mock-layout.spec.ignore";
import { PAYMENT_TYPE } from "../../../domain/enum/payment_type";
import { AppointmentCard } from "../appointment-card";
import * as reactRouter from "react-router";

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof reactRouter>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const mockNavigate = vi.fn();

const defaultProps = {
  id: "1",
  patientId: "10",
  firstName: "João",
  lastName: "Silva",
  isPaid: false,
  phone: "(11) 99999-9999",
  price: "200",
  scheduled: new Date("1999-09-15T14:30:00"),
  isDone: false,
  paymentType: PAYMENT_TYPE.MONTHLY,
};

describe("AppointmentCard", () => {
  it("click in card", () => {
    mockLayout(<AppointmentCard {...defaultProps} />);

    const card = screen.getByTestId("appointment-card");
    fireEvent.click(card);
    expect(mockNavigate).toBeCalled();
  });

  it("toggle isPaid", () => {
    mockLayout(<AppointmentCard {...defaultProps} />);

    const button = screen.getByTestId("paid_button");

    fireEvent.click(button);
    expect(screen.getByText("Pago")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });

  it("toggle isDone", () => {
    mockLayout(<AppointmentCard {...defaultProps} />);
    const button = screen.getByTestId("done_button");

    fireEvent.click(button);
    expect(screen.getByText("Realizada")).toBeInTheDocument();

    fireEvent.click(button);
    expect(screen.getByText("14:30 - 15/09")).toBeInTheDocument();
  });

  it("delete appointment", () => {
    const mockOnDelete = vi.fn();
    mockLayout(<AppointmentCard {...defaultProps} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByTestId("delete-button");
    fireEvent.click(deleteButton);

    const confirmButton = screen.getByText("Excluir");
    fireEvent.click(confirmButton);

    expect(mockOnDelete).toHaveBeenCalled();
  });
});
