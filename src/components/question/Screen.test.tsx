import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QuestionScreen } from "@/components/question/Screen";

const baseProps = {
  index: 2,
  label: "OUCH.",
  question: "A tricky situation arises. You:",
  answers: ["First option", "Second option", "Third option", "Fourth option"],
};

describe("QuestionScreen", () => {
  it("renders the label, question, and progress indicator", () => {
    render(<QuestionScreen {...baseProps} onAnswer={() => {}} />);

    expect(screen.getByText("OUCH.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: baseProps.question })
    ).toBeInTheDocument();
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("renders a button per answer, each prefixed with a letter", () => {
    render(<QuestionScreen {...baseProps} onAnswer={() => {}} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(baseProps.answers.length);
    expect(buttons[0]).toHaveTextContent("A");
    expect(buttons[0]).toHaveTextContent("First option");
    expect(buttons[3]).toHaveTextContent("D");
    expect(buttons[3]).toHaveTextContent("Fourth option");
  });

  it("calls onAnswer with the zero-based index of the chosen answer", async () => {
    const onAnswer = vi.fn();
    const user = userEvent.setup();
    render(<QuestionScreen {...baseProps} onAnswer={onAnswer} />);

    await user.click(screen.getByText("Third option"));

    await waitFor(() => expect(onAnswer).toHaveBeenCalledExactlyOnceWith(2));
  });
});
