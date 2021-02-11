// Spinner taken from tobiasahlin.com/spinkit and rewriten by me.
import React from "react";
import styled, { keyframes } from "styled-components";
//~~~~~~~~~~~~~~~~~~~Interfaces and types

interface SpinnerProps {
  width: string;
  height: string;
  margin?: string;
}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Rotate = keyframes`
  0% { 
    transform: perspective(120px) rotateX(0deg) rotateY(0deg);
  } 
  50% { 
    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
  } 
  100% { 
    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
  }
`;
const SpinnerElement = styled.main<SpinnerProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background-color: ${({ theme }) => theme.secondaryColorLight};
  margin: ${({ margin }) => margin};
  animation: ${Rotate} 1.2s infinite ease-in-out;
`;

const Spinner = ({ width, height, margin }: SpinnerProps): JSX.Element => {
  return (
    <SpinnerElement
      width={width}
      height={height}
      margin={margin ? margin : "0"}
    ></SpinnerElement>
  );
};

export default Spinner;
