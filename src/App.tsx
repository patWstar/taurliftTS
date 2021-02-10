import React from "react";
import styled from "styled-components";
import Navbar from "components/Navbar";
import Home from "components/Home";
//Basic CSS, Resets etc. are in index.css
const Wrapper = styled.div`
  .App {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    background: linear-gradient(to right, #005aa7, #fffde4);
  }
`;

const App = () => {
  return (
    <Wrapper>
      <Navbar />
      <Home />
    </Wrapper>
  );
};

export default App;
