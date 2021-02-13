import React from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
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
//~~~~~~~~~~~~~~~~~~~Styled Components
const Wrapper = styled.div`
  height: calc(100vh - 7rem);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url("backgrounds/backgroundMAX.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  color: ${({ theme }) => theme.textColor};
  padding: 4vh 4vw;

  @media only screen and (max-width: 37.5em) {
    padding: 0;
    justify-content: space-between;
    padding: 1vh 0;
    align-items: center;
    gap: 10px;

    background-size: 100% 100%;
  }
`;
const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  & > h1 {
    color: transparent;
    background: linear-gradient(to bottom, #2ecc71, #1b914c);
    -webkit-background-clip: text;
    background-clip: text;
    letter-spacing: 0.6rem;
    font-size: 9vmin;
    font-weight: 500;
    animation: ${fadeInAnimation} 1s linear 1;
    @media only screen and (max-width: 56.25em) {
      font-size: 7vmin;
    }
    @media only screen and (max-width: 37.5em) {
      font-size: 4rem;
      text-align: center;
    }
  }
`;
const HeaderLink = styled(Link)`
  color: inherit;
  font-size: 7.5vmin;
  transition: 0.4s;
  width: fit-content;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.primaryColor};
    letter-spacing: 0.2rem;
  }
  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;
const HeaderText = styled.p`
  font-size: 2.4vmin;
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
  display: flex;
  justify-content: center;
  align-items: center;
  color: inherit;
  height: 8vh;
  width: 30vw;
  max-width: 30rem;
  background-color: ${({ theme }) => theme.primaryColor};
  font-size: 2.4vmin;
  border-radius: 80px;
  transition: 0.4s;
  animation: ${shakeButton} 1s ease-out 1;

  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
  }
  @media only screen and (max-width: 37.5em) {
    margin: 0 auto;
    width: 18rem;
    height: 8rem;
    font-size: 2rem;
  }

  @media only screen and (max-height: 28.75em) {
    display: none;
  }
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4vw;
  width: 100%;
  @media only screen and (max-width: 56.25em) {
    height: fit-content;
    width: 100%;
    flex-wrap: nowrap;
    justify-content: center;
  }
  @media only screen and (max-width: 37.5em) {
    flex-wrap: wrap;
    padding: 0 10vw;
  }
`;

const NavButton = styled(Link)<NavButtonProps>`
  border-radius: 5px;
  width: 15vw;
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  background-color: ${(props) => props.color};
  transition: 0.4s;
  font-size: 2.5vmin;
  color: inherit;
  &:hover,
  &:focus {
    transform: scale(1.1);
    box-shadow: 0 1rem 2rem 1rem rgba(0, 0, 0, 0.2);
  }

  & > svg {
    fill: currentColor;
    width: 35%;
    height: 40%;
  }
  @media only screen and (max-width: 56.25em) {
    height: 20vh;
    width: 20%;
    flex-wrap: wrap;
    justify-content: center;
  }
  @media only screen and (max-width: 37.5em) {
    width: 30vw;
    height: 18vh;
    min-width: 10rem;
  }
`;
//~~~~~~~~~~~~~~~~~~~Component
const Home = (): JSX.Element => {
  const authenticated: boolean = useSelector(selectAuthenticated);

  return (
    <Wrapper>
      <Header>
        <h1>Outrun your bad habbits</h1>
        <HeaderLink to={authenticated ? "/workouts/WorkoutBuddy" : "/signup"}>
          {authenticated ? "Welcome Back!" : "Let's go"}
        </HeaderLink>
        <HeaderText>
          Give the world all you've got while Taurlift handles all
          <br />
          the boring stuff for you.
        </HeaderText>
        <HeaderButton to="">
          {authenticated ? "Let's work out!" : "Get Started!"}
        </HeaderButton>
      </Header>
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
    </Wrapper>
  );
};

export default Home;
