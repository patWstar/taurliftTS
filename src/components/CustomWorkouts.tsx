//Fundamentals
import React from "react";
import styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
//Components
import CreateWorkout from "components/CreateWorkout";
import MyWorkouts from "./MyWorkouts";
// import { validateExercise } from "../util/validators";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface CreateCustomWorkoutProps {}
type NavButtonProps = {
  activeClassName: string;
};

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.containerBackgroundPrimary};
  width: 55vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
`;
const ButtonRow = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
  gap: 5vw;
`;

const NavButton = styled(NavLink)`
  width: 40%;
  color: inherit;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #3498db;
  padding: 2.5rem;
  border-radius: 24px;
  transition: 0.4s;
  font-size: 2.5rem;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }
  &.${({ activeClassName }) => activeClassName} {
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const CreateCustomWorkout = ({}: CreateCustomWorkoutProps): JSX.Element => {
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default CreateCustomWorkout;
