//Fundamentals
import React from "react";
import styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
//Components
import CreateWorkout from "components/CustomWorkouts/CreateWorkout";
import MyWorkouts from "components/CustomWorkouts/MyWorkouts";
import FeatureFlexWrapper from "components/shared/components/FeatureFlexWrapper";
// import { validateExercise } from "../util/validators";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type NavButtonProps = {
  activeClassName: string;
};

//~~~~~~~~~~~~~~~~~~~Styled Components

const ButtonRow = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
  gap: 1rem;
`;

const NavButton = styled(NavLink)<NavButtonProps>`
  width: 40%;
  color: inherit;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #3498db;
  padding: 2rem;
  border-radius: 24px;
  transition: 0.4s;
  font-size: ${(props) => props.theme.fontMedium};

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }
  &.${({ activeClassName }) => activeClassName} {
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const CreateCustomWorkout = (): JSX.Element => {
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <FeatureFlexWrapper props={React.Children}>
      <ButtonRow>
        <NavButton
          to="/workouts/CustomWorkouts/CreateWorkout"
          activeClassName="active"
        >
          Create Workout
        </NavButton>
        <NavButton
          to="/workouts/CustomWorkouts/MyWorkouts"
          activeClassName="active"
        >
          My Workouts
        </NavButton>
      </ButtonRow>

      <Route
        path="/workouts/CustomWorkouts/CreateWorkout"
        component={CreateWorkout}
        exact
      />
      <Route
        path="/workouts/CustomWorkouts/MyWorkouts"
        component={MyWorkouts}
        exact
      />
    </FeatureFlexWrapper>
  );
};

export default CreateCustomWorkout;
