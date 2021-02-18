//Fundamentals
import React from "react";
import styled from "styled-components";
import { Route, Switch } from "react-router-dom";
//Components
import Navbar from "components/Navbar";
import Home from "components/Home";
import Login from "components/Auth/Login";
import Signup from "components/Auth/Signup";
import Workouts from "components/Workouts";
import WorkoutDiary from "components/WorkoutDiary/WorkoutDiary";
import Calculators from "components/CalculatorPage/Calculators";

//Styled Components
const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;

  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;

  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 1rem;
    scroll-behavior: smooth;
  }

  &::-webkit-scrollbar-track {
    background: #555;
  }

  &::-webkit-scrollbar-thumb {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #f1f1f1;
  }
`;

//Component
const App = (): JSX.Element => {
  return (
    <Wrapper>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/workouts" component={Workouts} />
        <Route path="/diary" component={WorkoutDiary} />
        <Route path="/calculators" component={Calculators} />
      </Switch>
    </Wrapper>
  );
};

export default App;

//todo ideas
//rewrite to REM's
//create a flex wrapper to get rid of flexbox boilerplate from every element
//switch gaps to space-between + padding
//create font-sizes in theme
//make wrappers max 1180px
//check how it will look if the background stays behind the whole time but blurred if the path !== /home
//try to make small components have paddings instead of widths and heights to avoid having to center them
