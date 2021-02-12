import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SubmitButton from "components/shared/components/SubmitButton";

interface WorkoutCardProps {
  imgSrc: string;
  header: string;
  textContent: string;
  linkTo: string;
}

const WorkoutCardElement = styled(Link)`
  width: 35rem;
  height: 60rem;
  margin: 0 3rem;
  text-align: center;
  color: inherit;
  box-shadow: 0px 0px 10px 1px rgb(32, 32, 32);
  border-radius: 20px;
  background: ${({ theme }) => theme.containerBackgroundSecondary};
  overflow: hidden;
  color: ${({ theme }) => theme.textColor};
  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 13px 3px rgb(32, 32, 32);
  }
`;

const CardImage = styled.img`
  width: stretch;
  height: 45%;
`;

const CardTitle = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15%;
  border-bottom: solid ${({ theme }) => theme.primaryColor} 2px;
  border-radius: 50%;
  font-size: 2rem;
`;

const CardDescription = styled.p`
  display: block;
  font-size: 2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
`;

const WorkoutCard = ({
  imgSrc,
  header,
  textContent,
  linkTo,
}: WorkoutCardProps): JSX.Element => {
  return (
    <WorkoutCardElement to={linkTo}>
      <CardImage src={imgSrc} />
      <CardTitle>{header}</CardTitle>
      <CardDescription>{textContent}</CardDescription>
      <SubmitButton value="Continue" width="20rem" />
    </WorkoutCardElement>
  );
};

export default WorkoutCard;
