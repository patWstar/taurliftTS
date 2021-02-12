//Fundamentals
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
//Components
import SelectorButton from "components/shared/components/SelectorButton";
import WorkoutBuddyCard from "components/WorkoutBuddyCard";
import Spinner from "components/shared/components/Spinner";
import DarkBackground from "components/shared/components/DarkBackground";
import SubmitButton from "components/shared/components/SubmitButton";
//Redux
import { useSelector } from "react-redux";
import { selectUserID } from "redux/Slices/UserSlice";
//Util
import refreshLocalToken from "util/refreshLocalToken";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface Exercise {
  exerciseName: string;
  setGoal: number;
  workoutName: string;
}
interface Workout {
  name: string;
  exercises: Exercise[];
  createdAt: string;
}
interface NewFinishedSet {
  name: string;
  repsDoneCount: number;
  setNumber: number;
  weight?: number | null;
}

interface NewFinishedWorkout {
  workoutName: string;
  exercises: NewFinishedSet[];
  createdAt: string;
  userID: string;
}
//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.containerBackgroundPrimary};
  width: 55vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
  gap: 5vw;
`;

const ContentWrapper = styled.main`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
`;
const ContentHeader = styled.header`
  display: flex;
  justify-content: center;
  gap: 5vw;
  align-items: center;
  width: 100%;
  & > h1 {
    font-size: 2.6rem;
  }
`;

const SelectWorkoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 50%;
  width: 70%;
  background: #030303;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  border-radius: 34px;
  position: relative;
  z-index: 5;
  overflow: auto;

  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1rem;
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar-track {
    background: #555;
  }

  &::-webkit-scrollbar-thumb {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #f1f1f1;
  }
`;

const SelectWorkoutHeader = styled.header`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  & > h2 {
    font-size: 2rem;
  }
`;

const SelectWorkoutContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  flex: 1;
  padding: 2rem 0rem;
  text-align: center;
`;

const SelectWorkoutButton = styled.button`
  background: ${({ theme }) => theme.primaryColor};
  width: 100%;
  color: inherit;
  font-size: 2rem;
  padding: 1rem;
  border-bottom: 1px solid black;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.secondaryColorLight};
  }
`;

const FinishedSetWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  padding: 4vh 2vw;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30%;
  height: 80%;
  border-radius: 36px;
  background: rgba(0, 0, 0);
  border: 2px solid ${({ theme }) => theme.primaryColor};
  z-index: 10;
  overflow: auto;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1rem;
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar-track {
    background: #555;
  }

  &::-webkit-scrollbar-thumb {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #f1f1f1;
  }
`;

const FinishedSetItem = styled.div`
  border: ${({ theme }) => theme.primaryColor} 1px solid;
  width: 100%;
  color: inherit;
  font-size: 2rem;
  padding: 1rem;
  font-size: 2vmin;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > * {
    border: 1px solid black;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const WorkoutBuddy = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [finishedSets, setFinishedSets] = useState<NewFinishedSet[]>([]);
  const [finishedSetsVisible, setFinishedSetsVisible] = useState<boolean>(
    false
  );

  const userID = useSelector(selectUserID);

  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get("/workouts/custom", {
        headers: {
          userID: userID,
        },
      })
      .then(({ data }) => {
        setWorkouts(data.exercises);
      })
      .then(() => {
        refreshLocalToken();
        setIsLoading(false);
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false);
        source.cancel();
      });

    return () => {
      source.cancel();
    };
  }, [userID]);

  const shareFinishedSet = (newFinishedSet: NewFinishedSet): void => {
    console.log(newFinishedSet);
    setFinishedSets([...finishedSets, newFinishedSet]);
  };

  const toggleFinishedSetsVisibility = (): void => {
    setFinishedSetsVisible(!finishedSetsVisible);
  };

  const changeWorkoutsHandler = (): void => {
    setSelectedWorkout(null);
    setFinishedSets([]);
  };

  const saveWorkoutHandler = (): void => {
    if (finishedSets.length === 0) {
      alert("No exercises completed :(");
      return;
    }
    if (selectedWorkout && finishedSets.length > 0) {
      const newFinishedWorkout: NewFinishedWorkout = {
        createdAt: new Date().toLocaleString(),
        exercises: finishedSets,
        workoutName: selectedWorkout.name,
        userID: userID,
      };

      setIsLoading(true);

      axios
        .post("/workouts", newFinishedWorkout)
        .then(() => {
          setIsLoading(false);

          refreshLocalToken();
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      {isLoading ? (
        <Spinner width="10rem" height="12rem" />
      ) : selectedWorkout ? (
        <>
          <ButtonRow>
            <SelectorButton
              value="Change Workout"
              width="40%"
              fontSize="2rem"
              height="10rem"
              onClick={changeWorkoutsHandler}
            />
            <SelectorButton
              value="New Workout"
              width="40%"
              fontSize="2rem"
              height="10rem"
            />
          </ButtonRow>
          <ContentWrapper>
            <ContentHeader>
              <h1>{selectedWorkout.name}</h1>
              <SubmitButton
                value="Show Completed Sets"
                width="20%"
                height="fit-content"
                fontSize="2.2rem"
                onClick={toggleFinishedSetsVisibility}
              />
              <SubmitButton
                value="Save Workout to Profile"
                width="20%"
                height="fit-content"
                fontSize="2.2rem"
                borderColor="primary"
                onClick={saveWorkoutHandler}
              />
            </ContentHeader>
            <WorkoutBuddyCard
              selectedWorkout={selectedWorkout}
              shareFinishedSet={shareFinishedSet}
            />
          </ContentWrapper>
          {finishedSetsVisible && (
            <>
              <DarkBackground onClick={toggleFinishedSetsVisibility} />
              <FinishedSetWrapper>
                {finishedSets.map((finishedSet) => (
                  <FinishedSetItem>
                    <span>{finishedSet.name}</span>
                    <span>Reps: {finishedSet.repsDoneCount}</span>
                    <span>Set: {finishedSet.setNumber}</span>
                    <span>
                      Weight: {finishedSet.weight ? finishedSet.weight : "N/A"}
                    </span>
                  </FinishedSetItem>
                ))}
              </FinishedSetWrapper>
            </>
          )}
        </>
      ) : (
        <>
          <DarkBackground />
          <SelectWorkoutWrapper>
            <SelectWorkoutHeader>
              <h2>Choose a Workout</h2>
            </SelectWorkoutHeader>
            <SelectWorkoutContent>
              {workouts.map((workout: Workout, index: number) => (
                <SelectWorkoutButton
                  onClick={() => setSelectedWorkout(workouts[index])}
                  key={index}
                >
                  {workout.name}
                </SelectWorkoutButton>
              ))}
            </SelectWorkoutContent>
          </SelectWorkoutWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default WorkoutBuddy;
