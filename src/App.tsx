import React from 'react';
import Header from './components/Header';
import VoteSelection from './components/voteSelectionContainer/VoteSelection';


function App() {
  return (
    <div className="App">
      <Header />
      <VoteSelection />
      <footer> 
        © 2024 website.org
      </footer>
    </div>
  );
}

export default App;
