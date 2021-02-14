import React from "react";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom/extend-expect";
import renderWithReduxAndRouter from "./utilRenderWithReduxAndRouter";

import WorkoutDiary from "../WorkoutDiary";

afterEach(cleanup);

test("should it render an information modal if the user breaks in (manually altering the url)", () => {
  const { getByText } = renderWithReduxAndRouter(<WorkoutDiary />, {
    initialState: { authenticated: false },
  });

  expect(
    getByText("The Diary Feature is only available for users who are logged in")
  ).toBeInTheDocument();
});
