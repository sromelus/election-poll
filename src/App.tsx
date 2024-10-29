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
        © 2024 unofficalpoll.com 
      </StyledFooter>
    </AppContainer>
  );
}

export default App;
