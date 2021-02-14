import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "redux/Slices/UserSlice";

const renderWithReduxAndRouter = (
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
export default renderWithReduxAndRouter;
