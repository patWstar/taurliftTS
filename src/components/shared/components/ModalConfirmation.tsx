//Fundamentals
import React from "react";
import styled from "styled-components";
//Components
import SubmitButton from "components/shared/components/SubmitButton";
import DarkBackground from "components/shared/components/DarkBackground";
//Redux
//Util
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface ModalConfirmationProps {
  text: string;
  onAccept: void | (() => void);
  backGroundClick?: void | (() => void);
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  z-index: 5;
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0);
  border: 2px solid ${({ theme }) => theme.primaryColor};
  width: 80vmin;
  height: 50vmin;
  border-radius: 36px;
  display: flex;
  flex-direction: column;
  font-size: 3vmin;
  color: ${({ theme }) => theme.textColor};
  font-size: 4vmin;
  padding: 2vh 0;
`;

const Text = styled.p`
  display: block;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 4vw;
  height: 20%;
`;

//~~~~~~~~~~~~~~~~~~~Component
const ModalConfirmation = ({
  text,
  onAccept,
  backGroundClick,
}: ModalConfirmationProps): JSX.Element => {
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <>
      <DarkBackground onClick={backGroundClick} />
      <Wrapper>
        <Text>{text}</Text>
        <ButtonRow>
          <SubmitButton
            value="cancel"
            width="30%"
            borderColor="red"
            fontSize="inherit"
            danger={true}
          />
          <SubmitButton
            value="Proceed"
            width="30%"
            borderColor="lighCoral"
            fontSize="inherit"
          />
        </ButtonRow>
      </Wrapper>
    </>
  );
};

export default ModalConfirmation;
