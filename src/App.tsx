import React from "react";
import styled from "styled-components";
import Navbar from "components/Navbar";
import Home from "components/Home";
import { Route, Switch } from "react-router-dom";
import Login from "components/Login";
import Signup from "components/Signup";
//Basic CSS, Resets etc. are in index.css
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: linear-gradient(to right, #005aa7, #fffde4);
`;

const App = (): JSX.Element => {
  return (
    <Wrapper>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </Wrapper>
  );
};

export default App;
