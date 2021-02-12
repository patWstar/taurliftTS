//Fundamentals
import React, { useRef, useState } from "react";
import styled from "styled-components";
//Components
import FormTextInput from "components/shared/components/FormTextInput";
import SubmitButton from "components/shared/components/SubmitButton";
//Redux
//Util
import refreshLocalToken from "util/refreshLocalToken";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type RowProps = {
  isOdd: boolean;
  index: number;
};
interface Exercise {
  workoutName: string;
  exerciseName: string;
  setAmount: number;
}
//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4vw;
`;

//~~~~~~~~~~~~~~~~~~~Component
const CreateWorkout = (): JSX.Element => {
  const workoutNameRef = useRef<HTMLInputElement>(null);
  const exerciseNameRef = useRef<HTMLInputElement>(null);
  const setAmountRef = useRef<HTMLInputElement>(null);

  const [createdExercises, setCreatedExercises] = useState<Exercise[]>([]);
  const clearSubInputs = (): void => {
    if (
      workoutNameRef.current &&
      exerciseNameRef.current &&
      setAmountRef.current
    ) {
      exerciseNameRef.current.value = "";
      setAmountRef.current.value = "";
      exerciseNameRef.current.focus();
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (
      workoutNameRef.current &&
      exerciseNameRef.current &&
      setAmountRef.current
    ) {
      const workoutName: string = workoutNameRef.current.value;
      const exerciseName: string = exerciseNameRef.current.value;
      const setAmount: number = Number(setAmountRef.current.value);

      const newExercise: Exercise = {
        workoutName,
        exerciseName,
        setAmount,
      };

      setCreatedExercises([...createdExercises, newExercise]);

      clearSubInputs();
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <Content>
        <FormContent onSubmit={handleSubmit}>
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
            reactRef={setAmountRef}
          />
          <SubmitButton value="Add Exercise" width="45%" fontSize="1.6rem" />
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
                    <td>{exercise.setAmount}</td>
                  </Row>
                );
              })}
            </tbody>
          </TableContent>
        </TableWrapper>
      </Content>
      <Footer>
        <SubmitButton value="Reset" width="30%" height="7rem" fontSize="2rem" />
        <SubmitButton
          value="Save Workout"
          width="30%"
          height="7rem"
          fontSize="2rem"
        />
      </Footer>
    </Wrapper>
  );
};

export default CreateWorkout;
