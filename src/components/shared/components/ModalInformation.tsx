import React, { useState } from "react";
import styled from "styled-components";
import appearForAMoment from "components/shared/animations/appearForAMoment";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface ModalInformationProps {
  text: string;
  linkTo?: string;
}

type WrapperProps = {
  visibility: boolean;
};

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div<WrapperProps>`
  position: absolute;

  animation: ${appearForAMoment} 2s linear 1;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  border: 2px solid ${({ theme }) => theme.primaryColor};
  width: 60vmin;
  height: 20vmin;
  border-radius: 36px;
  display: ${({ visibility }) => (visibility ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  font-size: 2vmin;
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  padding: 0 2vw;
`;

//~~~~~~~~~~~~~~~~~~~Component
const ModalInformation = ({
  text,
  linkTo,
}: ModalInformationProps): JSX.Element => {
  const [visible, setVisible] = useState<boolean>(true);
  setTimeout(() => {
    setVisible(false);
  }, 1800);

  //~~~~~~~~~~~~~~~~~~~Render
  return <Wrapper visibility={visible}>{text}</Wrapper>;
};

export default ModalInformation;
