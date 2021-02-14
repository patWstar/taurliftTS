import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "../Navbar";
import renderWithReduxAndRouter from "./utilRenderWithReduxAndRouter";

afterEach(cleanup);

test("change content when user is authenticated", () => {
  const { getByText } = renderWithReduxAndRouter(<Navbar />, {
    initialState: { authenticated: true },
  });

  expect(getByText("Logout")).toBeInTheDocument();
});

test("hide content when user is unauthenticated", async () => {
  const { queryAllByText } = renderWithReduxAndRouter(<Navbar />, {
    initialState: { authenticated: false },
  });

  expect(queryAllByText("Logout")).toEqual([]);
});
