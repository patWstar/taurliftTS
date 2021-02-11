import React from "react";
import styled from "styled-components";
interface DarkBackgroundProps {
  onClick?: React.SetStateAction<any | void>;
}

const Background = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;
const DarkBackground = ({ onClick }: DarkBackgroundProps): JSX.Element => {
  return <Background onClick={onClick} />;
};

export default DarkBackground;
