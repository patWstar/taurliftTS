//Fundamentals
import React, { useState, useRef } from "react";
import styled from "styled-components";
//Components
import SubmitButton from "components/shared/components/SubmitButton";
import FormTextInput from "components/shared/components/FormTextInput";
//Util
import { BMIValidator } from "util/validators";
import ErrorList from "components/shared/components/ErrorList";

//Criteria
const inputsCriteria: InputsCriteria = {
  userHeightCriteria: {
    min: 1,
    max: 999,
  },
  userWeightCriteria: {
    min: 1,
    max: 999,
  },
};

//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface CalculatorBMIProps {
  shareBMIResult: (BMIResult: number) => void;
}

interface InputsCriteria {
  userHeightCriteria: {
    min: number;
    max: number;
  };
  userWeightCriteria: {
    min: number;
    max: number;
  };
}
interface UserInputs {
  userHeight: number;
  userWeight: number;
}
//~~~~~~~~~~~~~~~~~~~Styled Components

const Content = styled.form`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
`;

//~~~~~~~~~~~~~~~~~~~Component
const CalculatorBMI = ({ shareBMIResult }: CalculatorBMIProps): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    if (heightInputRef.current && weightInputRef.current) {
      const userHeight: number = Number(heightInputRef.current.value);
      const userWeight: number = Number(weightInputRef.current.value);

      const userInputs: UserInputs = {
        userHeight,
        userWeight,
      };

      const validationErrors = BMIValidator({
        inputs: userInputs,
        inputsCriteria,
      });

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else if (validationErrors.length === 0) {
        setErrors([]);
        const bmiResult: number = Number(
          (userWeight / Math.pow(userHeight / 100, 2)).toFixed(2)
        );
        shareBMIResult(bmiResult);
      }
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <>
      <Content>
        <label htmlFor="userCalories">Height</label>
        <FormTextInput
          name="userCalories"
          placeholder="Centimeters"
          width="30%"
          reactRef={heightInputRef}
          type="number"
        />
        <label htmlFor="protein">Weight</label>
        <FormTextInput
          name="protein"
          placeholder="Centimeters"
          width="30%"
          reactRef={weightInputRef}
          type="number"
        />
        <SubmitButton value="Submit" width="30%" onClick={onSubmitHandler} />
        <ErrorList errors={errors} width="100%" />
      </Content>
    </>
  );
};

export default CalculatorBMI;
