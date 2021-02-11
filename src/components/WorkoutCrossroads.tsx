import React from "react";
import styled from "styled-components";
import cardImageDiary from "assets/cardImageDiary.jpg";
import cardImageCustomWorkout from "assets/cardImageCustomWorkout.jpg";
import cardImageWorkoutAssistant from "assets/cardImageWorkoutAssistant.jpg";
import WorkoutCard from "./shared/components/WorkoutCard";

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  width: 100%;
  height: 100%;
`;
//~~~~~~~~~~~~~~~~~~~Component
const WorkoutCrossroads = (): JSX.Element => {
  return (
    <Wrapper>
      <WorkoutCard
        imgSrc={cardImageDiary}
        header="Workout Diary"
        textContent="See completed workouts!"
        linkTo="/diary"
      />
      <WorkoutCard
        imgSrc={cardImageCustomWorkout}
        header="My Workouts"
        textContent="Create custom workouts!"
        linkTo="/workouts/CustomWorkouts/CreateWorkout"
      ></WorkoutCard>
      <WorkoutCard
        imgSrc={cardImageWorkoutAssistant}
        header="Workout Buddy"
        textContent="Start a workout!"
        linkTo="/workouts/WorkoutBuddy"
      ></WorkoutCard>
    </Wrapper>
  );
};

export default WorkoutCrossroads;
