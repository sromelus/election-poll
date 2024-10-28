import React, { useState } from 'react';
import CandidateCard from './CandidateCard';
import ProgressBar from './ProgressBar';
import styled from 'styled-components';

const CandidateCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const VoteSelection = () => {
    const [trumpPollNumbers, setTrumpPollNumbers] = useState(13);
    const [kamalaPollNumbers, setKamalaPollNumbers] = useState(34);

    const handleTrumpVote = () => {
        setTrumpPollNumbers(trumpPollNumbers + 1)
    }

    const handleKamalaVote = () => {
        setKamalaPollNumbers(kamalaPollNumbers + 1)
    }

  return (
    <>
        <CandidateCardContainer>
            <CandidateCard name="Candidate 1" label="Trump" button_color="red" onVote={handleTrumpVote} />
            <CandidateCard name="Candidate 1" label="Kamala" button_color="blue" onVote={handleKamalaVote} />
        </CandidateCardContainer>
        <ProgressBar color="red" percentage={trumpPollNumbers} />
        <ProgressBar color="blue" percentage={kamalaPollNumbers} />
    </>
  );
};

export default VoteSelection;
