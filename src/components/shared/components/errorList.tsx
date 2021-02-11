import React from "react";
import styled from "styled-components";

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

const errorList = ({ errors, width }: errorListProps): JSX.Element => (
  <Errors width={width}>
    {errors?.map((error) => (
      <li>{error}</li>
    ))}
  </Errors>
);

export default errorList;
