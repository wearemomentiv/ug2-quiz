import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "@/App";
import { ARCHETYPES } from "@/archetypes";

type User = ReturnType<typeof userEvent.setup>;

async function startQuiz(user: User) {
  await user.click(screen.getByRole("button", { name: /begin/i }));
}

// Answers every one of the 5 questions by clicking the answer at `answerIndex`
// (0 = A, 1 = B, 2 = C, 3 = D, 4 = E). Returns once the quiz is complete.
async function answerAll(user: User, answerIndex: number) {
  for (let q = 0; q < 5; q++) {
    const buttons = screen.getAllByRole("button");
    await user.click(buttons[answerIndex]);
  }
}

describe("App quiz flow", () => {
  it("starts on the intro screen", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /partnership personality/i })
    ).toBeInTheDocument();
  });

  it("advances through the questions after starting", async () => {
    const user = userEvent.setup();
    render(<App />);

    await startQuiz(user);

    expect(screen.getByText("1 / 5")).toBeInTheDocument();
    await user.click(screen.getAllByRole("button")[0]);
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("answering all A's yields the Bridge Builder result", async () => {
    const user = userEvent.setup();
    render(<App />);

    await startQuiz(user);
    await answerAll(user, 0);

    expect(
      screen.getByRole("heading", { name: ARCHETYPES.trust.name })
    ).toBeInTheDocument();
    expect(screen.getByText(/align most with/i)).toBeInTheDocument();
  });

  it("answering all E's yields a mixed Visionary result", async () => {
    const user = userEvent.setup();
    render(<App />);

    await startQuiz(user);
    await answerAll(user, 4);

    expect(
      screen.getByRole("heading", { name: ARCHETYPES.innovation.name })
    ).toBeInTheDocument();
    expect(screen.getByText(/mix of styles/i)).toBeInTheDocument();
  });

  it("lets the user retake the quiz from the result screen", async () => {
    const user = userEvent.setup();
    render(<App />);

    await startQuiz(user);
    await answerAll(user, 0);
    await user.click(screen.getByRole("button", { name: /retake quiz/i }));

    expect(
      screen.getByRole("heading", { name: /partnership personality/i })
    ).toBeInTheDocument();
  });
});
