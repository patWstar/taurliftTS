import React from "react";
import styled from "styled-components";

interface formTextInputProps {
  type?: string;
  name: string;
  placeholder: string;
  width: string;
  reactRef: React.ForwardedRef<HTMLInputElement>;
}
type InputProps = {
  width: string;
};
const Input = styled.input<InputProps>`
  outline: none;
  overflow: hidden;
  background: transparent;
  width: ${({ width }) => width};
  min-width: 19rem;
  border: 2px solid ${({ theme }) => theme.primaryColor};
  padding: 1.4rem 1.5rem;
  color: inherit;
  border-radius: 28px;
  transition: 0.4s;
  text-align: center;
  font-size: 2vmin;
  &:focus {
    transform: scaleX(1.2) scaleY(1.1);
    border-width: 2px;
    border-color: ${({ theme }) => theme.secondaryColorLight};
    background-color: transparent;
  }
  @media only screen and (max-width: 37.5em) {
    width: ${({ width }) => Number(width) * 2};
    font-size: 3vmin;
  }
`;
const formTextInput = ({
  type,
  name,
  placeholder,
  width,
  reactRef,
}: formTextInputProps) => (
  <Input
    type={type ? type : "text"}
    width={width}
    name={name}
    placeholder={placeholder}
    ref={reactRef}
  />
);

export default formTextInput;
