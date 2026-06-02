import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IntroScreen } from "@/components/intro/Screen";
import { ARCHETYPES } from "@/archetypes";

describe("IntroScreen", () => {
  it("renders the quiz title and intro copy", () => {
    render(<IntroScreen onStart={() => {}} />);

    expect(
      screen.getByRole("heading", { name: /partnership personality/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/pop quiz/i)).toBeInTheDocument();
    expect(screen.getByText(/5 questions/i)).toBeInTheDocument();
  });

  it("lists all four archetypes", () => {
    render(<IntroScreen onStart={() => {}} />);

    for (const { name } of Object.values(ARCHETYPES)) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
  });

  it("calls onStart when the Begin button is clicked", async () => {
    const onStart = vi.fn();
    const user = userEvent.setup();
    render(<IntroScreen onStart={onStart} />);

    await user.click(screen.getByRole("button", { name: /begin/i }));

    expect(onStart).toHaveBeenCalledTimes(1);
  });
});
