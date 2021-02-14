import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Signup from "../Signup";
import "@testing-library/jest-dom/extend-expect";
import renderWithReduxAndRouter from "util/utilRenderWithReduxAndRouter";
afterEach(cleanup);

test("should it fire an error message upon entering incorrect e-mail format", () => {
  const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(
    <Signup />,
    {
      initialState: { authenticated: false },
    }
  );

  fireEvent.change(getByPlaceholderText("E-mail"), {
    target: { value: "Not an email" },
  });
  fireEvent.submit(getByText("Sign Up"));

  expect(getByText("Incorrect e-mail format.")).toBeInTheDocument();
});

test("should it fire an incorrect message upon entering a password shorter than 6 character", () => {
  const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(
    <Signup />,
    {
      initialState: { authenticated: false },
    }
  );

  fireEvent.change(getByPlaceholderText("Password"), {
    target: { value: "short" },
  });
  fireEvent.submit(getByText("Sign Up"));

  expect(
    getByText("Password must be between 6 and 12 letters.")
  ).toBeInTheDocument();
});

test("should it throw out the user if he's already looged in (he broke in by manually altering the URL for example).", () => {
  const { queryAllByText } = renderWithReduxAndRouter(<Signup />, {
    initialState: { authenticated: true },
  });

  expect(queryAllByText("SIGN UP")).toEqual([]);
});
