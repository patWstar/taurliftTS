// Spinner taken from tobiasahlin.com/spinkit and rewriten by me.
import React from "react";
import styled, { keyframes } from "styled-components";
//~~~~~~~~~~~~~~~~~~~Interfaces and types

interface SpinnerProps {
  width: string;
  height: string;
  margin?: string;
}

// ~~~~~~~~~~~~~~~~~~~Styled Components
// const Rotate = keyframes`
//   0% {
//     transform: perspective(120px) rotateX(0deg) rotateY(0deg);
//   }
//   50% {
//     transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
//   }
//   100% {
//     transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
//   }
// `;
// const SpinnerElement = styled.main<SpinnerProps>`
//   width: ${({ width }) => width};
//   height: ${({ height }) => height};
//   background-color: ${({ theme }) => theme.secondaryColorLight};
//   margin: ${({ margin }) => margin};
//   animation: ${Rotate} 1.2s infinite ease-in-out;
// `;

// const Spinner = ({ width, height, margin }: SpinnerProps): JSX.Element => {
//   return (
//     <SpinnerElement
//       width={width}
//       height={height}
//       margin={margin ? margin : "0"}
//     ></SpinnerElement>
//   );
// };

//~~~~~~~~~~~~~~~~~~~Styled Components
const skChaseAnim = keyframes`
 100% { transform: rotate(360deg); } 

`;

const skChaseDotAnim = keyframes`
  80%, 100% { transform: rotate(360deg); } 
`;

const skChaseDotBeforeAnim = keyframes`
  50% {
    transform: scale(0.4); 
  } 100%, 0% {
    transform: scale(1.0); 
  } 
`;

const SkChase = styled.div<SpinnerProps>`
  width: ${(props) => props.width || "40px"};
  height: ${(props) => props.height || "40px"};
  margin: ${(props) => props.margin || "0"};
  position: relative;
  animation: ${skChaseAnim} 2.5s infinite linear both;
`;

const SkChaseDot = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  animation: ${skChaseDotAnim} 2s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -1.1s;
  }
  &:nth-child(2) {
    animation-delay: -1s;
  }
  &:nth-child(3) {
    animation-delay: -0.9s;
  }
  &:nth-child(4) {
    animation-delay: -0.8s;
  }
  &:nth-child(5) {
    animation-delay: -0.7s;
  }
  &:nth-child(6) {
    animation-delay: -0.6s;
  }
  &:nth-child(1):before {
    animation-delay: -1.1s;
  }
  &:nth-child(2):before {
    animation-delay: -1s;
  }
  &:nth-child(3):before {
    animation-delay: -0.9s;
  }
  &:nth-child(4):before {
    animation-delay: -0.8s;
  }
  &:nth-child(5):before {
    animation-delay: -0.7s;
  }
  &:nth-child(6):before {
    animation-delay: -0.6s;
  }

  &:before {
    content: "";
    display: block;
    width: 25%;
    height: 25%;
    background-color: ${(props) => props.theme.primaryColor};
    border-radius: 100%;
    animation: ${skChaseDotBeforeAnim} 2s infinite ease-in-out both;
  }
`;
const Spinner = ({ width, height, margin }: SpinnerProps): any => {
  return (
    <SkChase width={width} height={height} margin={margin}>
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
      <SkChaseDot />
    </SkChase>
  );
};

export default Spinner;
