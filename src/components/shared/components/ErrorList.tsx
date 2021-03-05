import React from "react";
import styled from "styled-components";
//Visual for red text in the form of a list
interface errorListProps {
  errors?: string[];
  width: string;
}

type ulProps = {
  width: string;
};
const Errors = styled.ul<ulProps>`
  text-align: center;
  width: ${({ width }) => width};
  font-size: 1.6rem;
  color: red;
  list-style: none;
`;

const ErrorList = ({ errors, width }: errorListProps): JSX.Element => (
  <Errors width={width}>
    {errors?.map((error, index) => (
      <li key={index}>{error}</li>
    ))}
  </Errors>
);

export default ErrorList;
