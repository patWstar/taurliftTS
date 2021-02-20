import React, { Children } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
//Components
import FeatureFlexWrapper from "components/shared/components/FeatureFlexWrapper";
//Assets
import Icons from "assets/sprites.svg";
import fadeInAnimation from "components/shared/animations/fadeIn";
//Redux
import { useSelector } from "react-redux";
import { selectAuthenticated } from "redux/Slices/UserSlice";

//~~~~~~~~~~~~~~~~~~~Interfaces & Types
type NavButtonProps = {
  color: string;
};

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  background-color: ${(props) => props.theme.containerBackgroundPrimary};
  padding: 2rem;
  width: 98vw;
  gap: 0.5rem;
  & > h1 {
    color: transparent;
    background: linear-gradient(to bottom, #2ecc71, #1b914c);
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 0.6rem;
    font-size: ${(props) => props.theme.fontExtremeLarge};
    font-weight: 500;
    animation: ${fadeInAnimation} 1s linear 1;
  }
`;
const HeaderText = styled.p`
  font-size: ${(props) => props.theme.fontMediumLarge};
  padding: 0.5rem;
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;
const shakeButton = keyframes`
  0% {
  }
  30% {
    transform: scale(1.1);
  }
  60% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(15deg);
  }
  90% {
    transform: rotate(-15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;
const HeaderButton = styled(Link)`
  color: inherit;
  padding: 1.5rem 5rem;
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 80px;
  transition: 0.4s;
  margin: 0 auto;
  animation: ${shakeButton} 1s ease-out 1;
  font-size: ${(props) => props.theme.fontMedium};
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
  }
  @media only screen and (max-height: 28.75em) {
    display: none;
  }
`;

const Navigation = styled.nav`
  flex: 1;
  align-self: stretch;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const NavButton = styled(Link)<NavButtonProps>`
  float: left;
  border-radius: 5px;
  width: 34%;
  min-height: fit-content;
  max-height: 50%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: ${(props) => props.color};
  transition: 0.4s;
  font-size: ${(props) => props.theme.fontMedium};
  color: inherit;
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
    z-index: 2;
  }

  & > svg {
    fill: currentColor;
    width: 35%;
    height: 40%;
  }

  @media only screen and (max-width: 37.5em) {
    width: 45%;
    height: 18vh;
    min-height: 30vw;
    min-width: 10rem;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const Home = (): JSX.Element => {
  const authenticated: boolean = useSelector(selectAuthenticated);

  return (
    <FeatureFlexWrapper props={Children} backgroundColor="none">
      <Header>
        <h1>Outrun your bad habbits</h1>
        <HeaderText>
          Give the world all you've got while Taurlift handles all
          <br />
          the boring stuff for you.
        </HeaderText>
        <HeaderButton to="">
          {authenticated ? "Work out!" : "Start!"}
        </HeaderButton>
      </Header>
      <span>
        <Navigation>
          <NavButton to="/diary" color="#db343480">
            <svg>
              <use xlinkHref={`${Icons}#icon-paste`} />
            </svg>
            Diary
          </NavButton>
          <NavButton to="/calculators" color="#2f6ac480">
            <svg>
              <use xlinkHref={`${Icons}#icon-stats-dots`} />
            </svg>
            Calculators
          </NavButton>
        </Navigation>
        <Navigation>
          <NavButton to="/workouts" color="#2ecc7180">
            <svg>
              <use xlinkHref={`${Icons}#icon-fire`} />
            </svg>
            Workouts
          </NavButton>
          <NavButton to="/workouts/CreateWorkout" color="#dbd03481">
            <svg>
              <use xlinkHref={`${Icons}#icon-paragraph-left`} />
            </svg>
            Create
          </NavButton>
        </Navigation>
      </span>
    </FeatureFlexWrapper>
  );
};

export default Home;
