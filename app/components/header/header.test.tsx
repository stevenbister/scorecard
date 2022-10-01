import { MemoryRouter } from "react-router-dom";
import Header from "./index";
import { screen, render } from "@testing-library/react";

test("renders the header component with nav links", () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole("link", { name: /home/i });
  const accountLink = screen.getByRole("link", { name: /account/i });
  const playersLink = screen.getByRole("link", { name: /players/i });

  expect(homeLink).toHaveAttribute("href", "/");
  expect(accountLink).toHaveAttribute("href", "/account");
  expect(playersLink).toHaveAttribute("href", "/players");
});
