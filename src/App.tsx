import React from 'react';
import styled from "styled-components";

import Navbar from "components/Navbar";
//Basic CSS, Resets etc. are in index.css
const Wrapper = styled.div`
  .App {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
`;

const App = () => {

  return (
    <Wrapper>
      <Navbar />
    </Wrapper>
  );
}

export default App