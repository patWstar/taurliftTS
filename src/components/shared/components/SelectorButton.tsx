import styled from "styled-components";

interface SelectorButtonProps {
  value: string;
  width: string;
  height?: string;
  fontSize?: string;
  onClick?: () => void;
}
const Button = styled.button<SelectorButtonProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  font-size: ${({ fontSize }) => fontSize};
  color: inherit;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  border: 2px solid #3498db;
  padding: 2.5rem;
  border-radius: 24px;
  transition: 0.4s;

  &:hover {
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;

const SelectorButton = ({
  value,
  width,
  height,
  fontSize,
  onClick,
}: SelectorButtonProps): JSX.Element => (
  <Button
    value={value}
    width={width}
    height={height}
    fontSize={fontSize}
    onClick={onClick}
  >
    {value}
  </Button>
);
export default SelectorButton;
