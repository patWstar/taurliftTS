import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalculatorMacros from "components/CalculatorPage/CalculatorMacros";
afterEach(cleanup);
test("check if errors appear if macros don`t add up to 100%", () => {
  const { getByText, getByPlaceholderText } = render(<CalculatorMacros />);
  fireEvent.change(
    getByPlaceholderText("Carbs %", { target: { value: "32" } })
  );
  fireEvent.change(
    getByPlaceholderText("Protein %", { target: { value: "33" } })
  );
  fireEvent.change(getByPlaceholderText("Fats %", { target: { value: "33" } }));
  fireEvent.click(getByText("Submit"));
  expect(
    getByText("Percentages must add up to a full 100%")
  ).toBeInTheDocument();
});
