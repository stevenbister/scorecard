import { Error, StatusError } from "./Error";
import { screen, render } from "@testing-library/react";

test("displays the caught error message", () => {
  const error = {
    name: "error",
    message:
      '"No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."',
  };

  render(<Error error={error} />);

  const heading = screen.getByRole("heading", { level: 1 });
  const message = screen.getByText(error.message);

  expect(heading).toHaveTextContent("Error");
  expect(message).toBeInTheDocument();
});

test("displays the status error", () => {
  const caught = {
    status: 404,
    statusText: "Not Found",
  };

  render(<StatusError status={caught.status} text={caught.statusText} />);

  const heading = screen.getByRole("heading", { level: 1 });
  const message = screen.getByText(caught.statusText);

  expect(heading).toHaveTextContent("404");
  expect(message).toBeInTheDocument();
});
