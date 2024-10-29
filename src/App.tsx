import React from 'react';
import Header from './components/Header';
import VoteSelection from './components/voteSelectionContainer/VoteSelection';
import { styled } from 'styled-components';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledFooter = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 1rem;
`;

function App() {
  return (
    <AppContainer>
      <Header />
      <VoteSelection />
      <StyledFooter>
        © 2024 sprunoffpolling.com | <a href="mailto:sprunoffpolling@gmail.com">Contact Me</a> | <a href="https://www.facebook.com/sprunoffpolling">Share with Friends</a>
      </StyledFooter>
    </AppContainer>
  );
}

export default App;
