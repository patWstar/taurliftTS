import React from "react";
import styled from "styled-components";
import { string } from "yargs";

interface SubmitButtonProps {
  value: string;
  width: string;
  height?: string;
  fontSize?: string;
  onClick?: () => void;
}

const Submit = styled.button<SubmitButtonProps>`
  background: none;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.secondaryColorLight};
  padding: 1.4rem 1rem;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  outline: none;
  border-radius: 28px;
  transition: 0.4s;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;
  font-size: ${({ fontSize }) => fontSize};
  &:hover {
    background-color: ${({ theme }) => theme.secondaryColorLight};
  }
`;

const SubmitButton = ({
  value,
  width,
  height,
  fontSize,
  onClick,
}: SubmitButtonProps): JSX.Element => (
  <Submit
    value={value}
    width={width}
    height={height}
    fontSize={fontSize}
    onClick={onClick}
  >
    {value}
  </Submit>
);
export default SubmitButton;
