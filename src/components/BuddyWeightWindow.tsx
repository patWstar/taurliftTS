//Fundamentals
import React, { useRef } from "react";
import styled from "styled-components";
//Components
import DarkBackground from "components/shared/components/DarkBackground";
import FormTextField from "components/shared/components/FormTextInput";
import SubmitButton from "components/shared/components/SubmitButton";
//Redux
//Util
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface BuddyWeightWindowProps {
  onBackgroundClick: () => void;
  handleSetWeight: (weight: number) => void;
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60%;
  width: 40%;
  background: #030303;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  border-radius: 34px;
  position: relative;
  z-index: 5;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  gap: 5vh;
  @media only screen and (max-width: 56.25em) {
    width: 80%;
    height: 70%;
  }
`;

//~~~~~~~~~~~~~~~~~~~Component
const BuddyWeightWindow = ({
  onBackgroundClick,
  handleSetWeight,
}: BuddyWeightWindowProps): JSX.Element => {
  const weightRef = useRef<HTMLInputElement>(null);

  const setWeight = (event: React.FormEvent): void => {
    event.preventDefault();
    if (weightRef.current) {
      const weight: number = Number(weightRef.current.value);

      weight > 0 && weight < 999
        ? handleSetWeight(weight)
        : alert("Weight must be a number between 1 and 999");
    }
  };
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <>
      <DarkBackground onClick={onBackgroundClick} />
      <Wrapper onSubmit={setWeight}>
        <FormTextField
          name="weight"
          placeholder="kilograms"
          reactRef={weightRef}
          width="50%"
          type="number"
        />
        <SubmitButton
          value="Submit"
          width="35%"
          fontSize="3vmin"
          height="10%"
        />
      </Wrapper>
    </>
  );
};

export default React.memo(BuddyWeightWindow);
