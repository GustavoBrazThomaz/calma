import * as reactRouter from "react-router";
import { fireEvent, screen } from "@testing-library/dom";
import { describe, expect, it, vi } from "vitest";
import { CaseEvolutionCard } from "../case-evolution-card";
import { mockLayout } from "../../../app/__test__/mocks/mock-layout.spec.ignore";

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
  patientId: "2",
  title: "Mock evolution",
  createdAt: new Date("1999-09-15T14:30:00"),
};

describe("CaseEvolutionCard", () => {
  it("click in card", () => {
    mockLayout(<CaseEvolutionCard {...defaultProps} />);
    const card = screen.getByTestId("case_evolution_card");

    fireEvent.click(card);
    expect(mockNavigate).toBeCalled();
  });

  it("click in detail button", () => {
    mockLayout(<CaseEvolutionCard {...defaultProps} />);
    const button = screen.getByText("Ver detalhes");

    fireEvent.click(button);
    expect(mockNavigate).toBeCalled();
  });
});
