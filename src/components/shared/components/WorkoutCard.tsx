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
  height: 70vh;
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
  @media only screen and (max-width: 56.25em) {
    margin: 0 5px;
  }
  @media only screen and (max-width: 37.5em) {
    height: 33%;
    width: 70%;
    margin: 1vh 0;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 45%;
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;

const CardTitle = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 15%;
  border-bottom: solid ${({ theme }) => theme.primaryColor} 2px;
  border-radius: 50%;
  font-size: 2.4vmin;
  @media only screen and (max-width: 37.5em) {
    height: 30%;
  }
  @media only screen and (max-width: 37.5em) {
    font-size: 3.5vmin;
  }
`;

const CardDescription = styled.p`
  display: block;
  font-size: 2.5vmin;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20%;
  padding: 0 2vw;
  @media only screen and (max-width: 37.5em) {
    height: 50%;
  }
  @media only screen and (max-width: 37.5em) {
    font-size: 3.5vmin;
  }
`;

const CardButtonSpan = styled.span`
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
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
      <CardButtonSpan>
        <SubmitButton value="Continue" width="80%" />
      </CardButtonSpan>
    </WorkoutCardElement>
  );
};

export default WorkoutCard;
