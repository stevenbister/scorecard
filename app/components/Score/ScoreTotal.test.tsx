import ScoreTotal from "./ScoreTotal";
import { screen, render } from "@testing-library/react";

test("outputs the score total", () => {
  render(<ScoreTotal score={4} />);

  expect(screen.getByText(/score: 4/i)).toBeVisible();
});
