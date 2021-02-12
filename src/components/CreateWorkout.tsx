//Fundamentals
import React, { useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
//Components
import FormTextInput from "components/shared/components/FormTextInput";
import SubmitButton from "components/shared/components/SubmitButton";
import Spinner from "components/shared/components/Spinner";
import ErrorList from "components/shared/components/ErrorList";
//Redux
import { useSelector } from "react-redux";
import { selectUserID } from "redux/Slices/UserSlice";
//Util
import refreshLocalToken from "util/refreshLocalToken";
import { validateExercise } from "util/validators";

//Criteria
const validCriteria: ValidCriteria = {
  workoutName: {
    min: 1,
    max: 12,
  },
  exerciseName: {
    min: 1,
    max: 10,
  },
  setGoal: {
    min: 1,
    max: 999,
  },
};

//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type RowProps = {
  isOdd: boolean;
  index: number;
};
interface Exercise {
  workoutName: string;
  exerciseName: string;
  setGoal: number;
}
interface Criteria {
  min: number;
  max: number;
}
interface ValidCriteria {
  workoutName: Criteria;
  exerciseName: Criteria;
  setGoal: Criteria;
}

interface NewWorkout {
  workoutName: string;
  createdExercises: Exercise[];
  createdAt: string;
  userID: string;
}
//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;
const InputLabel = styled.label`
  font-size: 2rem;
`;
const Content = styled.main`
  display: flex;
  height: 85%;
`;
const FormContent = styled.form`
  width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3vh;
`;
const TableWrapper = styled.span`
  height: 100%;
  width: 50%;
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
const TableContent = styled.table`
  width: 100%;

  table-layout: fixed;
  text-align: left;
  & th {
    font-size: 2.4rem;
  }
`;

const Row = styled.tr<RowProps>`
  font-size: 2rem;
  background-color: ${({ theme, isOdd }) =>
    isOdd ? theme.containerBackgroundSecondary : "transparent"};
  & > td {
    padding: 1rem;
  }
`;
const Footer = styled.footer`
  height: 15%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;
`;

//~~~~~~~~~~~~~~~~~~~Component
const CreateWorkout = (): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const [createdExercises, setCreatedExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const workoutNameRef = useRef<HTMLInputElement>(null);
  const exerciseNameRef = useRef<HTMLInputElement>(null);
  const setGoalRef = useRef<HTMLInputElement>(null);

  const userID = useSelector(selectUserID);

  const clearSubInputs = (): void => {
    if (exerciseNameRef.current && setGoalRef.current) {
      exerciseNameRef.current.value = "";
      setGoalRef.current.value = "";
      exerciseNameRef.current.focus();
    }
  };

  const fullReset = (): void => {
    if (
      workoutNameRef.current &&
      exerciseNameRef.current &&
      setGoalRef.current
    ) {
      workoutNameRef.current.value = "";
      exerciseNameRef.current.value = "";
      setGoalRef.current.value = "";
      setCreatedExercises([]);
    }
  };
  const handleLocalSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      workoutNameRef.current &&
      exerciseNameRef.current &&
      setGoalRef.current
    ) {
      const workoutName: string = workoutNameRef.current.value;
      const exerciseName: string = exerciseNameRef.current.value;
      const setGoal: number = Number(setGoalRef.current.value);

      const newExercise: Exercise = {
        workoutName,
        exerciseName,
        setGoal,
      };

      const validationErrors: string[] = validateExercise(
        newExercise,
        validCriteria
      );

      if (validationErrors.length !== 0) {
        setErrors(validationErrors);
      } else if (validationErrors.length === 0) {
        setCreatedExercises([...createdExercises, newExercise]);
        clearSubInputs();
        setErrors([]);
      }
    }
  };

  const handleWebSubmit = (): void => {
    if (
      workoutNameRef.current &&
      createdExercises.length > 0 &&
      workoutNameRef.current.value.length > 0
    ) {
      const workoutName: string = workoutNameRef.current.value;

      const createdAt: string = new Date().toLocaleString();

      const newWorkout: NewWorkout = {
        workoutName,
        createdExercises,
        createdAt,
        userID,
      };
      setIsLoading(true);
      axios
        .post("/workouts/custom", newWorkout)
        .then(() => {
          setIsLoading(false);
        })
        .then(() => {
          fullReset();
          refreshLocalToken();
        })
        .catch((err) => {
          alert(err.response.data);
          setIsLoading(false);
        });
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      {isLoading ? (
        <Spinner width="10rem" height="12rem" />
      ) : (
        <>
          <Content>
            <FormContent onSubmit={handleLocalSubmit}>
              <InputLabel htmlFor="Workout Name">Workout Name</InputLabel>
              <FormTextInput
                name="Workout Name"
                placeholder="Workout Name"
                width="50%"
                reactRef={workoutNameRef}
              />
              <InputLabel htmlFor="Workout Name">Exercise Name</InputLabel>
              <FormTextInput
                name="Exercise Name"
                placeholder="Exercise Name"
                width="50%"
                reactRef={exerciseNameRef}
              />
              <InputLabel htmlFor="Workout Name">Set Amount</InputLabel>
              <FormTextInput
                name="Set Amount"
                placeholder="Set Amount"
                type="number"
                width="50%"
                reactRef={setGoalRef}
              />
              <SubmitButton
                value="Add Exercise"
                width="45%"
                fontSize="1.6rem"
              />
              {errors.length > 0 && <ErrorList width="100%" errors={errors} />}
            </FormContent>
            <TableWrapper>
              <TableContent>
                <thead>
                  <tr>
                    <th scope="col" colSpan={2}>
                      Exercise Name
                    </th>
                    <th scope="col">Set Goal</th>
                  </tr>
                </thead>
                <tbody>
                  {createdExercises.map((exercise, index) => {
                    return (
                      <Row
                        index={index}
                        isOdd={!(index % 2) ? true : false}
                        key={index}
                      >
                        <td colSpan={2}>{exercise.exerciseName}</td>
                        <td>{exercise.setGoal}</td>
                      </Row>
                    );
                  })}
                </tbody>
              </TableContent>
            </TableWrapper>
          </Content>
          <Footer>
            <SubmitButton
              value="Reset"
              width="30%"
              height="7rem"
              fontSize="2rem"
              onClick={fullReset}
            />
            <SubmitButton
              value="Save Workout"
              width="30%"
              height="7rem"
              fontSize="2rem"
              onClick={handleWebSubmit}
            />
          </Footer>
        </>
      )}
    </Wrapper>
  );
};

export default CreateWorkout;