import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ResultScreen } from "@/components/result/Screen";
import { ARCHETYPES } from "@/archetypes";

describe("ResultScreen", () => {
  it("renders the matched archetype name and blurb", () => {
    render(
      <ResultScreen
        result={{ key: "trust", isMixed: false }}
        onRestart={() => {}}
      />
    );

    expect(
      screen.getByRole("heading", { name: ARCHETYPES.trust.name })
    ).toBeInTheDocument();
    expect(screen.getByText(ARCHETYPES.trust.blurb)).toBeInTheDocument();
    expect(screen.getByText(/align most with/i)).toBeInTheDocument();
  });

  it("uses the mixed lead-in copy when the result is mixed", () => {
    render(
      <ResultScreen
        result={{ key: "innovation", isMixed: true }}
        onRestart={() => {}}
      />
    );

    expect(screen.getByText(/mix of styles/i)).toBeInTheDocument();
  });

  it("shows the archetype badge with descriptive alt text", () => {
    render(
      <ResultScreen
        result={{ key: "commitment", isMixed: false }}
        onRestart={() => {}}
      />
    );

    const badge = screen.getByRole("img", {
      name: `${ARCHETYPES.commitment.name} badge`,
    });
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveAttribute("src", ARCHETYPES.commitment.icon);
  });

  it("applies the archetype's brand background color", () => {
    const { container } = render(
      <ResultScreen
        result={{ key: "expertise", isMixed: false }}
        onRestart={() => {}}
      />
    );

    expect(container.firstChild).toHaveClass(ARCHETYPES.expertise.color);
  });

  it("calls onRestart when the retake button is clicked", async () => {
    const onRestart = vi.fn();
    const user = userEvent.setup();
    render(
      <ResultScreen
        result={{ key: "trust", isMixed: false }}
        onRestart={onRestart}
      />
    );

    await user.click(screen.getByRole("button", { name: /retake quiz/i }));

    expect(onRestart).toHaveBeenCalledTimes(1);
  });
});
