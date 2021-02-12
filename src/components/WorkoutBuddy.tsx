//Fundamentals
import React from "react";
import styled from "styled-components";
//Components
import SelectorButton from "components/shared/components/SelectorButton";
import WorkoutBuddyCard from "components/WorkoutBuddyCard";
//Redux
//Util
//~~~~~~~~~~~~~~~~~~~Interfaces & Types

//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  height: 100%;
  background: ${({ theme }) => theme.containerBackgroundPrimary};
  width: 55vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.textColor};
  overflow: hidden;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;
  width: 100%;
  gap: 5vw;
`;

const ContentWrapper = styled.main`
  flex: 1;
  align-self: stretch;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4vh;
`;
const ContentHeader = styled.header`
  & > h1 {
    font-size: 2.6rem;
  }
`;
const Footer = styled.footer`
  height: fit-content;
  display: flex;
  justify-content: center;
  gap: 8vw;
  align-items: center;
`;

const FooterButton = styled.button`
  width: 30rem;
  background-color: rgba(0, 0, 0, 0.2);
  color: inherit;
  font-size: 3rem;
  border-radius: 5px;
  height: 8rem;

  &:hover {
    transform: scaleY(-2px);
    border: 2px ${({ theme }) => theme.primaryColor} solid;
    font-weight: 500;
  }
`;

//~~~~~~~~~~~~~~~~~~~Component
const WorkoutBuddy = (): JSX.Element => {
  //~~~~~~~~~~~~~~~~~~~Render
  return (
    <Wrapper>
      <ButtonRow>
        <SelectorButton
          value="Workout List"
          width="40%"
          fontSize="2rem"
          height="10rem"
        />
        <SelectorButton
          value="New Workout"
          width="40%"
          fontSize="2rem"
          height="10rem"
        />
      </ButtonRow>
      <ContentWrapper>
        <ContentHeader>
          <h1>Workout Name</h1>
        </ContentHeader>
        <WorkoutBuddyCard />
      </ContentWrapper>
      <Footer>
        <FooterButton>Previous Exercise</FooterButton>
        <FooterButton>Next Exercise</FooterButton>
      </Footer>
    </Wrapper>
  );
};

export default WorkoutBuddy;
