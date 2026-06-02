import { test, expect, type Page } from "@playwright/test";

// Clicks the answer at `answerIndex` (0 = A ... 4 = E) for all 5 questions.
async function answerAll(page: Page, answerIndex: number) {
  for (let q = 1; q <= 5; q++) {
    await expect(page.getByText(`${q} / 5`)).toBeVisible();
    await page.getByRole("button").nth(answerIndex).click();
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("shows the intro screen on load", async ({ page }) => {
  await expect(
    page.getByRole("heading", { name: /partnership personality/i })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /begin/i })).toBeVisible();
});

test("walks through the whole quiz and shows a result", async ({ page }) => {
  await page.getByRole("button", { name: /begin/i }).click();

  await answerAll(page, 0); // all A -> Bridge Builder

  await expect(
    page.getByRole("heading", { name: "Bridge Builder" })
  ).toBeVisible();
  await expect(page.getByText(/align most with/i)).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Bridge Builder badge" })
  ).toBeVisible();
});

test("produces a mixed result when every answer is the joke option", async ({
  page,
}) => {
  await page.getByRole("button", { name: /begin/i }).click();

  await answerAll(page, 4); // all E -> mixed Visionary

  await expect(page.getByRole("heading", { name: "Visionary" })).toBeVisible();
  await expect(page.getByText(/mix of styles/i)).toBeVisible();
});

test("lets the user retake the quiz", async ({ page }) => {
  await page.getByRole("button", { name: /begin/i }).click();
  await answerAll(page, 0);

  await page.getByRole("button", { name: /retake quiz/i }).click();

  await expect(
    page.getByRole("heading", { name: /partnership personality/i })
  ).toBeVisible();
});
