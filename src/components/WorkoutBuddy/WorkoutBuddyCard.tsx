//Fundamentals
import React, { useState, useEffect } from "react";
import styled from "styled-components";
//Components
import SubmitButton from "components/shared/components/SubmitButton";
//Util
import refreshLocalToken from "util/refreshLocalToken";
import Icons from "assets/sprites.svg";
import BuddyWeightWindow from "components/WorkoutBuddy/BuddyWeightWindow";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface Exercise {
  exerciseName: string;
  setGoal: number;
  workoutName: string;
}
interface NewFinishedSet {
  name: string;
  repsDoneCount: number;
  setNumber: number;
  weight?: number | null;
}
interface Workout {
  exercises: Exercise[];
  name: string;
  createdAt: string;
}
interface WorkoutBuddyCardProps {
  selectedWorkout: Workout;
  shareFinishedSet: (newFinishedSet: NewFinishedSet) => void;
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 2.4vmin;
  overflow: hidden;
  padding: 0 2vw;
  @media only screen and (max-width: 56.25em) {
    width: 100%;
  }
  @media only screen and (max-width: 37.5em) {
    justify-content: flex-start;
    padding: 0;
    height: fit-content;
  }
`;
const CardWrapper = styled.div`
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0 3vw;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 2.4vmin;
  @media only screen and (max-width: 37.5em) {
    flex: 0;
    height: fit-content;
  }
`;
const InfoText = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  white-space: nowrap;
  overflow: hidden;
  & h1 {
    font-size: 5vmin;
    letter-spacing: 2px;
  }
  & h2 {
    font-size: 4vmin;
  }
  @media only screen and (max-width: 37.5em) {
    height: 10%;
  }
`;

const Content = styled.main`
  height: 60%;
  width: 100%;
  display: flex;
  @media only screen and (max-width: 37.5em) {
    display: flex;
    flex-direction: column;
  }
`;

const TimerContainer = styled.article`
  width: 50%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vh;

  & > h3 {
    font-size: 4vmin;
    color: ${({ theme }) => theme.secondaryColorLight};
    @media only screen and (max-width: 37.5em) {
      font-size: 5vmin;
    }
  }
  @media only screen and (max-width: 37.5em) {
    width: 100%;
    height: fit-content;
    gap: 1vh;
  }
`;

const RepsContainer = styled.article`
  width: 50%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;

  & > h2 {
    font-size: 3vmin;
    color: ${({ theme }) => theme.primaryColor};
    @media only screen and (max-width: 37.5em) {
      display: none;
    }
  }

  @media only screen and (max-width: 37.5em) {
    width: 100%;
    flex: 1;
    height: 70%;
  }
`;

const RepControls = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  padding-bottom: 8vh;
  & > h2 {
    font-size: 10vh;
  }
`;
const ControlButton = styled.button`
  width: 30%;
  height: 60%;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 24px;
  transition: 0.4s;
  padding: 1vmin;
  & > svg {
    fill: currentColor;
    width: 100%;
    height: 100%;
    @media only screen and (max-width: 37.5em) {
      width: 80%;
      height: 70%;
    }
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.primaryColor};
  }

  @media only screen and (max-width: 37.5em) {
    width: 30%;
  }
  @media only screen and (max-width: 37.5em) {
    height: 50%;
  }
`;
const CardFooter = styled.footer`
  height: 20%;
  width: 100%;
  padding-bottom: 2vh;
  display: flex;
  justify-content: space-between;

  & button {
    @media only screen and (max-width: 37.5em) {
      font-size: 3vmin;
      padding: 0;
    }
  }
`;

const Footer = styled.footer`
  height: fit-content;
  display: flex;
  justify-content: center;
  gap: 8vw;
  align-items: center;

  @media only screen and (max-width: 37.5em) {
    flex: 1;
  }
`;

const FooterButton = styled.button`
  width: 40%;
  background-color: rgba(0, 0, 0, 0.2);
  color: inherit;
  font-size: 2.2vmin;
  border-radius: 5px;
  height: 100%;

  &:hover {
    transform: scaleY(-2px);
    border: 2px ${({ theme }) => theme.primaryColor} solid;
    font-weight: 500;
  }
  @media only screen and (max-width: 37.5em) {
    font-size: 4vmin;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const WorkoutBuddyCard = ({
  selectedWorkout,
  shareFinishedSet,
}: WorkoutBuddyCardProps): JSX.Element => {
  const [exercisesInWorkout, setExercisesInWorkout] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [weightWindowVisible, setWeightWindowVisible] = useState<boolean>(
    false
  );

  const [timerCount, setTimerCount] = useState<string>("0:00");
  const [exerciseWeight, setExerciseWeight] = useState<number | null>(null);
  const [currentSet, setCurrentSet] = useState<number>(1);
  const [repCount, setRepCount] = useState<number>(1);

  useEffect(() => {
    setExercisesInWorkout(
      selectedWorkout.exercises.map((exercise: Exercise) => exercise)
    );
  }, [selectedWorkout]);

  useEffect(() => {
    let startingPoint = 0;
    let timerInterval = setInterval(() => {
      startingPoint = startingPoint + 1;
      const seconds = startingPoint % 10;
      const tenSeconds = Math.floor(startingPoint / 10) % 6;
      const minutes = Math.floor(startingPoint / 60);
      const formatedTime = `${minutes}:${tenSeconds}${seconds}`;
      setTimerCount(formatedTime);
    }, 1000);
    return () => {
      clearInterval(timerInterval);
      setTimerCount("0:00");
    };
  }, [currentExerciseIndex, selectedWorkout, currentSet]);

  const handleSetRep = (action: string): void => {
    switch (action) {
      case "Increment": {
        repCount + 1 <= 999 && setRepCount(repCount + 1);
        break;
      }
      case "Decrement": {
        repCount - 1 >= 1 && setRepCount(repCount - 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSetCurrentExerciseIndex = (action: string): void => {
    setTimerCount("0:00");
    switch (action) {
      case "Increment": {
        currentExerciseIndex + 1 < exercisesInWorkout.length &&
          setCurrentExerciseIndex(currentExerciseIndex + 1);
        break;
      }
      case "Decrement": {
        currentExerciseIndex - 1 >= 0 &&
          setCurrentExerciseIndex(currentExerciseIndex - 1);
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSetWeight = (weight: number): void => {
    setExerciseWeight(weight);
    setWeightWindowVisible(false);
  };
  const handleEndSet = (): void => {
    const newFinishedSet: NewFinishedSet = {
      name: exercisesInWorkout[currentExerciseIndex].exerciseName,
      repsDoneCount: repCount,
      setNumber: currentSet,
      weight: exerciseWeight,
    };
    shareFinishedSet(newFinishedSet);
    setCurrentSet(currentSet + 1);
    setRepCount(1);
    refreshLocalToken();
  };

  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <CardWrapper>
        {exercisesInWorkout.length > 0 && (
          <>
            <InfoText>
              <span>
                <p>{`${currentExerciseIndex + 1} of ${
                  exercisesInWorkout.length
                }`}</p>
                <h1>
                  {exercisesInWorkout[currentExerciseIndex].exerciseName}
                  {exerciseWeight && `${exerciseWeight}kg`}
                </h1>
              </span>

              <span>
                <h2>Set: {currentSet}</h2>
              </span>
            </InfoText>
            <Content>
              <TimerContainer>
                <h3>Timer</h3>
                <h2>{timerCount}</h2>
              </TimerContainer>
              <RepsContainer>
                <h2>Reps</h2>
                <RepControls>
                  <ControlButton onClick={() => handleSetRep("Decrement")}>
                    <svg className="exercise-card__reps-controls-control-icon">
                      <use xlinkHref={`${Icons}#icon-reply`} />
                    </svg>
                  </ControlButton>
                  <h2 data-testid="repCountHeader">{repCount}</h2>
                  <ControlButton
                    onClick={() => handleSetRep("Increment")}
                    data-testid="increment"
                  >
                    <svg className="exercise-card__reps-controls-control-icon">
                      <use xlinkHref={`${Icons}#icon-forward`} />
                    </svg>
                  </ControlButton>
                </RepControls>
              </RepsContainer>
            </Content>
            <CardFooter>
              <SubmitButton
                value="Set Weight"
                width="30%"
                height="100%"
                borderColor="primary"
                fontSize="2vmin"
                onClick={() => setWeightWindowVisible(true)}
              />
              <SubmitButton
                value="End Set"
                width="30%"
                height="100%"
                fontSize="2vmin"
                onClick={handleEndSet}
              />
            </CardFooter>
          </>
        )}
      </CardWrapper>
      <Footer>
        <FooterButton
          onClick={() => handleSetCurrentExerciseIndex("Decrement")}
        >
          Previous Exercise
        </FooterButton>
        <FooterButton
          onClick={() => handleSetCurrentExerciseIndex("Increment")}
        >
          Next Exercise
        </FooterButton>
      </Footer>
      {weightWindowVisible && (
        <BuddyWeightWindow
          handleSetWeight={handleSetWeight}
          onBackgroundClick={() => setWeightWindowVisible(false)}
        />
      )}
    </Wrapper>
  );
};

export default React.memo(WorkoutBuddyCard);
