import {
  validateEmail,
  removeNewLine,
  stringToArray,
  arrayValuesToNumbers,
  sumArray,
} from "./utils";

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail(undefined)).toBe(false);
  expect(validateEmail(null)).toBe(false);
  expect(validateEmail("")).toBe(false);
  expect(validateEmail("not-an-email")).toBe(false);
  expect(validateEmail("n@")).toBe(false);
});

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toBe(true);
});

test("removes new line from string", () => {
  expect(removeNewLine("1\n2\n2\n3")).toEqual("1 2 2 3");
  expect(removeNewLine("1\n2\n2\n 3")).toEqual("1 2 2 3");
  expect(removeNewLine("1 \n 2 \n 2 \n 3")).toEqual("1 2 2 3");
});

test("turns a string into an array", () => {
  expect(stringToArray("1 2 2 3")).toEqual(["1", "2", "2", "3"]);
  expect(stringToArray("  1 2 2 3")).toEqual(["1", "2", "2", "3"]);
  expect(stringToArray("  1 2 2 3   ")).toEqual(["1", "2", "2", "3"]);
  expect(stringToArray("1 2 2 3   ")).toEqual(["1", "2", "2", "3"]);
});

test("turns array values into numbers", () => {
  expect(arrayValuesToNumbers(["1", "2", "2", "3"])).toEqual([1, 2, 2, 3]);
});

test("sums the values of the array", () => {
  expect(sumArray([1, 2])).toEqual(3);
  expect(sumArray([1, 2, 3])).toEqual(6);
  expect(sumArray([1, 2, 2, 3])).toEqual(8);
  expect(sumArray([])).toEqual(0);
  expect(sumArray([NaN])).toEqual(0);
});
