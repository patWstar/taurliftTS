import React from "react";
import styled from "styled-components";
import Navbar from "components/Navbar";
import Home from "components/Home";
import { Route, Switch } from "react-router-dom";
import Login from "components/Login";
import Signup from "components/Signup";
import Workouts from "components/Workouts";
import WorkoutDiary from "components/WorkoutDiary";
import Calculators from "components/Calculators";

//Basic CSS, Resets etc. are in index.css
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  min-height: fit-content;
  overflow: auto;
  background: linear-gradient(to right, #005aa7, #fffde4);

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

//todo
//funkcjonalnosc w create workout
//workout buddy
//kalkulatory
//media queriesy
//react testing i jest
