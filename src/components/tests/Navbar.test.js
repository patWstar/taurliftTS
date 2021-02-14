import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, queryAllByText } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "redux/Slices/UserSlice";
import Navbar from "../Navbar";
//helper function

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducer, { user: initialState }) } = {}
) => {
  return {
    ...render(
      <BrowserRouter>
        <Provider store={store}>{component}</Provider>
      </BrowserRouter>
    ),
    store,
  };
};

test("render logout when authenticated", () => {
  const { getByText } = renderWithRedux(<Navbar />, {
    initialState: { authenticated: true },
  });

  expect(getByText("Logout")).toBeInTheDocument();
});

test("don't render logout when unauthenticated", async () => {
  const { queryAllByText } = renderWithRedux(<Navbar />, {
    initialState: { authenticated: false },
  });

  expect(queryAllByText("Logout")).toEqual([]);
});
