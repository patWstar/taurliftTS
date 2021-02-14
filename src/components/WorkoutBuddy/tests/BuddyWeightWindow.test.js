import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import BuddyWeightWindow from "../BuddyWeightWindow";

afterEach(cleanup);

test("should render properly with submit button", () => {
  const { getByText } = render(
    <BuddyWeightWindow
      handleSetWeight={() => {}}
      onBackgroundClick={() => {}}
    />
  );

  expect(getByText("Submit")).toBeInTheDocument();
});

test("should render with form field", () => {
  const { getByPlaceholderText } = render(
    <BuddyWeightWindow
      handleSetWeight={() => {}}
      onBackgroundClick={() => {}}
    />
  );

  expect(getByPlaceholderText("kilograms")).toBeInTheDocument();
});

test("should show modal on empty submit", () => {
  const { getByText } = render(
    <BuddyWeightWindow
      handleSetWeight={() => {}}
      onBackgroundClick={() => {}}
    />
  );

  fireEvent.submit(getByText("Submit"));

  expect(
    getByText("Input must be a value between 1 and 999")
  ).toBeInTheDocument();
});

test("should disappear after 2 seconds on correct submit", () => {
  const { getByText, getByPlaceholderText } = render(
    <BuddyWeightWindow
      handleSetWeight={() => {}}
      onBackgroundClick={() => {}}
    />
  );
  fireEvent.change(getByPlaceholderText("kilograms"), {
    target: { value: 55 },
  });
  fireEvent.submit(getByText("Submit"));

  setTimeout(() => {
    expect(getByText("Submit")).not.toBeInTheDocument();
  }, 2000);
});
