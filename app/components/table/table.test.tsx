import Table from "./index";
import { screen, render } from "@testing-library/react";

test("renders the table component with some data", () => {
  render(
    <Table
      stats={{
        wins: 10,
        draws: 1,
        losses: 7,
      }}
    />
  );

  const table = screen.getByRole("table");
  const tableHeaders = screen.getAllByRole("columnheader");
  const tableCells = screen.getAllByRole("gridcell");

  expect(table).toBeVisible();
  expect(tableHeaders).toHaveLength(3);
  expect(tableCells).toHaveLength(3);

  expect(tableHeaders[0]).toHaveTextContent("wins");
  expect(tableHeaders[1]).toHaveTextContent("draws");
  expect(tableHeaders[2]).toHaveTextContent("losses");

  expect(tableCells[0]).toHaveTextContent("10");
  expect(tableCells[1]).toHaveTextContent("1");
  expect(tableCells[2]).toHaveTextContent("7");
});
