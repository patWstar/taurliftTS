import React from "react";
import { cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Login from "../Login";
import "@testing-library/jest-dom/extend-expect";
import renderWithReduxAndRouter from "util/utilRenderWithReduxAndRouter";

afterEach(cleanup);

test("should it disallow empty fields", () => {
  const { getByText, getByPlaceholderText } = renderWithReduxAndRouter(
    <Login />,
    {
      initialState: { authenticated: false },
    }
  );

  fireEvent.change(getByPlaceholderText("E-mail"), { target: { value: " " } });
  fireEvent.submit(getByText("Log In"));

  expect(getByText("Username can't be empty")).toBeInTheDocument();
});

test("should it throw out the user if he's already looged in (he broke in by manually altering the URL for example).", () => {
  const { queryAllByText } = renderWithReduxAndRouter(<Login />, {
    initialState: { authenticated: true },
  });

  expect(queryAllByText("LOG IN")).toEqual([]);
});
