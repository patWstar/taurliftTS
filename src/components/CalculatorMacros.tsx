//Fundamentals
import React, { useState, useRef } from "react";
import styled from "styled-components";
//Components
import SubmitButton from "components/shared/components/SubmitButton";
import FormTextInput from "./shared/components/FormTextInput";
//Util
import { macronutrientValidator } from "util/validators";
import ErrorList from "components/shared/components/ErrorList";

const inputsCriteria = {
  userCaloriesCriteria: {
    min: 1,
    max: 99999,
  },
  userProteinCriteria: {
    min: 0,
    max: 100,
  },
  userCarbsCriteria: {
    min: 0,
    max: 100,
  },
  userFatsCriteria: {
    min: 0,
    max: 100,
  },
  percentSum: 100,
};
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface CalculatorMacrosProps {
  shareMacroResult: (macroResult: {
    kcalFromProtein: number;
    kcalFromCarbs: number;
    kcalFromFats: number;
  }) => void;
}
interface UserInputs {
  userCalories: number;
  userProtein: number;
  userCarbs: number;
  userFats: number;
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2vh 2vw;
`;

const Content = styled.form`
  align-self: stretch;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 2vmin;
`;

//~~~~~~~~~~~~~~~~~~~Component
const CalculatorMacros = ({
  shareMacroResult,
}: CalculatorMacrosProps): JSX.Element => {
  const [errors, setErrors] = useState<string[]>([]);
  const calorieInputRef = useRef<HTMLInputElement>(null);
  const proteinInputRef = useRef<HTMLInputElement>(null);
  const carbsInputRef = useRef<HTMLInputElement>(null);
  const fatsInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();

    if (
      calorieInputRef.current &&
      proteinInputRef.current &&
      carbsInputRef.current &&
      fatsInputRef.current
    ) {
      const userCalories: number = Number(proteinInputRef.current.value);
      const userProtein: number = Number(proteinInputRef.current.value);
      const userCarbs: number = Number(carbsInputRef.current.value);
      const userFats: number = Number(fatsInputRef.current.value);

      const userInputs: UserInputs = {
        userCalories,
        userProtein,
        userCarbs,
        userFats,
      };

      const validationErrors = macronutrientValidator({
        inputs: userInputs,
        inputsCriteria,
      });

      if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else if (validationErrors.length === 0) {
        setErrors([]);
        const kcalFromProtein: number = Math.round(
          (Number(calorieInputRef.current.value) / 400) * userProtein
        );
        const kcalFromCarbs: number = Math.round(
          (Number(calorieInputRef.current.value) / 400) * userCarbs
        );
        const kcalFromFats: number = Math.round(
          (Number(calorieInputRef.current.value) / 900) * userFats
        );

        shareMacroResult({ kcalFromProtein, kcalFromCarbs, kcalFromFats });
      }
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <Content>
        <label htmlFor="userCalories">Calories</label>
        <FormTextInput
          name="userCalories"
          placeholder="Daily"
          width="30%"
          reactRef={calorieInputRef}
          type="number"
        />
        <label htmlFor="protein">Protein %</label>
        <FormTextInput
          name="protein"
          placeholder="Daily %"
          width="30%"
          reactRef={proteinInputRef}
          type="number"
        />
        <label htmlFor="carbs">Carbs %</label>
        <FormTextInput
          name="carb"
          placeholder="Daily %"
          width="30%"
          reactRef={carbsInputRef}
          type="number"
        />
        <label htmlFor="fats">Fats %</label>
        <FormTextInput
          name="fats"
          placeholder="Daily %"
          width="30%"
          reactRef={fatsInputRef}
          type="number"
        />
        <SubmitButton value="Submit" width="30%" onClick={onSubmitHandler} />
        <ErrorList errors={errors} width="100%" />
      </Content>
    </Wrapper>
  );
};

export default CalculatorMacros;
