import { memo } from "react";
import styled from "styled-components";

interface SubmitButtonProps {
  value: string;
  width: string;
  height?: string;
  fontSize?: string;
  borderColor?: string;
  onClick?: () => void;
}

const Submit = styled.button<SubmitButtonProps>`
  background: none;
  text-align: center;
  border: 2px solid
    ${({ theme, borderColor }) =>
      borderColor === "primary"
        ? theme.primaryColor
        : theme.secondaryColorLight};
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
    background-color: ${({ theme, borderColor }) =>
      borderColor === "primary"
        ? theme.primaryColor
        : theme.secondaryColorLight};
  }
`;

const SubmitButton = ({
  value,
  width,
  height,
  fontSize,
  borderColor,
  onClick,
}: SubmitButtonProps): JSX.Element => (
  <Submit
    value={value}
    width={width}
    height={height}
    fontSize={fontSize}
    onClick={onClick}
    borderColor={borderColor}
  >
    {value}
  </Submit>
);
export default memo(SubmitButton);
