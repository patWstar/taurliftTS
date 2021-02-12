//Fundamentals
import React from "react";
import styled from "styled-components";
//Components

import SubmitButton from "components/shared/components/SubmitButton";
//Redux
//Util
import Icons from "assets/sprites.svg";
//~~~~~~~~~~~~~~~~~~~Interfaces & Types
interface WorkoutBuddyCardProps {}

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  height: 80%;
  width: 80%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 2.4rem;
  overflow: hidden;
  padding: 0 3rem;
`;

const InfoText = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  align-items: center;
  height: 20%;
  white-space: nowrap;
  & h2 {
    font-size: 2.4vmin;
  }
`;

const Content = styled.main`
  height: 60%;
  width: 100%;
  display: flex;
`;

const TimerContainer = styled.article`
  width: 50%;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4vh;

  & > h3 {
    font-size: 4vmin;
    color: ${({ theme }) => theme.secondaryColorLight};
  }
`;

const RepsContainer = styled.article`
  width: 50%;
  align-self: stretch;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1vh;

  & > h3 {
    font-size: 3vmin;
    color: ${({ theme }) => theme.primaryColor};
  }
`;

const RepControls = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1vw;
  padding-bottom: 8vh;
  & > h2 {
    font-size: 10vh;
  }
`;
const ControlButton = styled.button`
  width: 30%;
  height: 60%;
  border: 1px solid ${({ theme }) => theme.primaryColor};
  border-radius: 24px;
  transition: 0.4s;
  padding: 1vmin;
  & > svg {
    fill: currentColor;
    width: 100%;
    height: 100%;
  }

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.primaryColor};
  }
`;
const Footer = styled.footer`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

//~~~~~~~~~~~~~~~~~~~Component
const WorkoutBuddyCard = (): JSX.Element => {
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <InfoText>
        <span>
          <h2>
            Exercise Name <br /> weight
          </h2>
        </span>
        <span>
          <h2>Set:asdasdsa</h2>
        </span>
      </InfoText>
      <Content>
        <TimerContainer>
          <h3>Timer</h3>
          <h3>00:00</h3>
        </TimerContainer>
        <RepsContainer>
          <h3>Reps</h3>
          <RepControls>
            <ControlButton>
              <svg className="exercise-card__reps-controls-control-icon">
                <use xlinkHref={`${Icons}#icon-reply`} />
              </svg>
            </ControlButton>
            <h2>5</h2>
            <ControlButton>
              <svg className="exercise-card__reps-controls-control-icon">
                <use xlinkHref={`${Icons}#icon-forward`} />
              </svg>
            </ControlButton>
          </RepControls>
        </RepsContainer>
      </Content>
      <Footer>
        <SubmitButton
          value="Set Weight"
          width="30%"
          height="100%"
          borderColor="primary"
          fontSize="2vmin"
        />
        <SubmitButton
          value="End Set"
          width="30%"
          height="100%"
          fontSize="2vmin"
        />
        <SubmitButton
          value="Finish Exercise"
          width="30%"
          height="100%"
          borderColor="primary"
          fontSize="2vmin"
        />
      </Footer>
    </Wrapper>
  );
};

export default WorkoutBuddyCard;
