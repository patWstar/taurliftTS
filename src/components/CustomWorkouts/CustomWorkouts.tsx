//Fundamentals
import React from "react";
import styled from "styled-components";
import { NavLink, Route } from "react-router-dom";
//Components
import CreateWorkout from "components/CustomWorkouts/CreateWorkout";
import MyWorkouts from "components/CustomWorkouts/MyWorkouts";
// import { validateExercise } from "../util/validators";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type NavButtonProps = {
  activeClassName: string;
};

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.containerBackgroundPrimary};

  width: 55vw;
  min-height: 490px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
  @media only screen and (max-width: 107em) {
    width: 80%;
  }
  @media only screen and (max-width: 75em) {
    width: 100%;
  }
`;
const ButtonRow = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
  gap: 5vw;
`;

const NavButton = styled(NavLink)<NavButtonProps>`
  width: 40%;
  color: inherit;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #3498db;
  padding: 2.5rem;
  border-radius: 24px;
  transition: 0.4s;
  font-size: 2.5vmin;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }
  &.${({ activeClassName }) => activeClassName} {
    background-color: ${({ theme }) => theme.primaryColor};
  }
  @media only screen and (max-width: 37.5em) {
    font-size: 3.2vmin;
    padding: 3vh 0;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const CreateCustomWorkout = (): JSX.Element => {
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
