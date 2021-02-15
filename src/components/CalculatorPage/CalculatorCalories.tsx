//Fundamentals
import React, { useState, useRef } from "react";
import styled from "styled-components";
//Components
import SubmitButton from "components/shared/components/SubmitButton";
import FormTextInput from "components/shared/components/FormTextInput";
//Util
import { calorieValidator } from "util/validators";
import ErrorList from "components/shared/components/ErrorList";

const inputsCriteria = {
  userHeightCriteria: {
    min: 1,
    max: 999,
  },
  userWeightCriteria: {
    min: 1,
    max: 999,
  },
  userAgeCriteria: {
    min: 1,
    max: 200,
  },
};
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type RadioProps = {
  checked?: boolean;
};
interface CalculatorCaloriesProps {
  shareCalorieResult: (calorieResult: number) => void;
}
interface UserData {
  userHeight: number;
  userWeight: number;
  userAge: number;
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
  @media only screen and (max-width: 37.5em) {
    font-size: 3vmin;
    text-align: center;
  }

  & select {
    user-select: none;
    height: fit-content;
    border: none;
    outline: none;
    background-color: rgba(0, 0, 0, 0.2);
    color: $text-color;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    font-size: 1.6vmin;
    color: inherit;
    cursor: pointer;
    & option {
      background-color: rgba(0, 0, 0, 0.9);
      padding: 0.5vmin;
    }
    @media only screen and (max-width: 37.5em) {
      font-size: 3vmin;
    }
  }
`;

const RadioWrapper = styled.div`
  display: flex;

  justify-content: space-between;
  align-items: center;
  text-align: center;

  width: 30%;
  margin: 0 auto;
`;

const Radio = styled.div<RadioProps>`
  display: flex;
  height: 4vh;
  width: 100%;

  align-items: center;
  cursor: pointer;
  font-size: 2vmin;

  &:before {
    content: "";
    position: relative;
    margin: 0vh 1vw;
    width: 3vh;
    height: 3vh;
    border-radius: 100px;
    border: 4px solid ${({ theme }) => theme.secondaryColorLight};
    background-color: ${({ theme, checked }) =>
      checked ? theme.secondaryColorDark : "transparent"};
  }
`;

//~~~~~~~~~~~~~~~~~~~Component
const CalculatorCalories = ({
  shareCalorieResult,
}: CalculatorCaloriesProps): JSX.Element => {
  const [userGender, setUserGender] = useState<string>("woman");
  const [errors, setErrors] = useState<string[]>([]);
  const [activityFactor, setActivityFactor] = useState<number>(1.2);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const weightInputRef = useRef<HTMLInputElement>(null);
  const ageInputRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    console.log("elo");
    if (
      heightInputRef.current &&
      weightInputRef.current &&
      ageInputRef.current
    ) {
      console.log("elo2");
      const userHeight: number = Number(heightInputRef.current.value);
      const userWeight: number = Number(weightInputRef.current.value);
      const userAge: number = Number(ageInputRef.current.value);

      const userData: UserData = {
        userHeight,
        userWeight,
        userAge,
      };
      const validationErrors = calorieValidator({
        inputs: userData,
        inputsCriteria,
      });
      if (validationErrors.length > 0) {
        setErrors(validationErrors);
      } else if (validationErrors.length === 0) {
        setErrors([]);
        let calorieResult: number;
        if (userGender === "man") {
          calorieResult =
            (13.397 * userWeight +
              4.799 * userHeight -
              5.677 * userAge +
              88.362) *
            Number(activityFactor);
        } else {
          calorieResult =
            (9.247 * userWeight +
              3.098 * userHeight -
              4.33 * userAge +
              447.593) *
            Number(activityFactor);
        }

        shareCalorieResult(Number(calorieResult.toFixed()));
      }
    }
  };

  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <Content>
        <label htmlFor="userHeight">Height</label>
        <FormTextInput
          name="userHeight"
          placeholder="Centimeters"
          width="30%"
          reactRef={heightInputRef}
          type="number"
        />
        <label htmlFor="userHeight">Weight</label>
        <FormTextInput
          name="userHeight"
          placeholder="Kilograms"
          width="30%"
          reactRef={weightInputRef}
          type="number"
        />
        <label htmlFor="userHeight">Age</label>
        <FormTextInput
          name="userHeight"
          placeholder="Years"
          width="30%"
          reactRef={ageInputRef}
          type="number"
        />
        <RadioWrapper>
          <Radio
            onClick={() => setUserGender("woman")}
            checked={userGender === "woman"}
          >
            Woman
          </Radio>
          <Radio
            onClick={() => setUserGender("man")}
            checked={userGender === "man"}
          >
            Man
          </Radio>
        </RadioWrapper>
        <select
          onChange={(e) => {
            setActivityFactor(Number(e.target.value));
          }}
        >
          <option value="1.2">Sedentary ( x1.2 )</option>
          <option value="1.4">Slightly Active ( x1.4 )</option>
          <option value="1.6">Active ( x1.6 )</option>
          <option value="1.8">Very Active ( x1.8 )</option>
          <option value="2">Extremely Active ( x2.0 )</option>
        </select>
        <SubmitButton value="Submit" width="30%" onClick={onSubmitHandler} />
        <ErrorList errors={errors} width="100%" />
      </Content>
    </Wrapper>
  );
};

export default CalculatorCalories;
