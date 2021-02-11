import React from "react";
import styled from "styled-components";

interface SubmitButtonProps {
  value: string;
  width: string;
}

const Submit = styled.button<SubmitButtonProps>`
  background: none;
  text-align: center;
  border: 2px solid ${({ theme }) => theme.secondaryColorLight};
  padding: 1.4rem 1rem;
  width: ${({ width }) => width};
  outline: none;
  border-radius: 28px;
  transition: 0.4s;
  color: ${({ theme }) => theme.textColor};
  font-weight: 600;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColorLight};
  }
`;

const SubmitButton = ({ value, width }: SubmitButtonProps): JSX.Element => (
  <Submit value={value} width={width}>
    {value}
  </Submit>
);
export default SubmitButton;
