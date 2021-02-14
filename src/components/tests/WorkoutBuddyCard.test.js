import React from "react";
import { cleanup, fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WorkoutBuddyCard from "../WorkoutBuddyCard";
import "@testing-library/jest-dom/extend-expect";
afterEach(cleanup);

test("check if timer has a firm and accurate grasp of seconds", () => {
  const { getByText } = render(
    <WorkoutBuddyCard
      selectedWorkout={{
        name: "Stronglifts",
        exercises: [
          { exerciseName: "squat", setGoal: 4, workoutName: "Stronglifts" },
        ],
        createdAt: "justNow",
      }}
    />,
    {
      initialState: { authenticated: true },
    }
  );

  setTimeout(() => {
    expect(getByText("0:03")).toBeInTheDocument();
  }, 3000);
});

test("do repetitions increment correctly", () => {
  const { getByTestId } = render(
    <WorkoutBuddyCard
      selectedWorkout={{
        name: "Stronglifts",
        exercises: [
          { exerciseName: "squat", setGoal: 4, workoutName: "Stronglifts" },
        ],
        createdAt: "justNow",
      }}
    />,
    {
      initialState: { authenticated: true },
    }
  );

  fireEvent.click(getByTestId("increment"));
  expect(getByTestId("repCountHeader")).toHaveTextContent("2");
});

test("check if exercise header renders according to props ", () => {
  const { getByText } = render(
    <WorkoutBuddyCard
      selectedWorkout={{
        name: "Stronglifts",
        exercises: [
          { exerciseName: "squat", setGoal: 4, workoutName: "Stronglifts" },
        ],
        createdAt: "justNow",
      }}
    />,
    {
      initialState: { authenticated: true },
    }
  );

  expect(getByText("squat")).toBeInTheDocument();
});
