import React, { useState } from 'react';
import CandidateCard from './CandidateCard';
import ProgressBar from './ProgressBar';
import styled from 'styled-components';
import trumpImage from '../../trump_img.png'
import kamalaImage from '../../kamala_img.png'

const CandidateCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const ProgressBarContainer = styled.div`
  padding: 20px;
  margin-top: 0px;

  @media (min-width: 768px) {
    margin-top: 50px;
  }
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
            <CandidateCard label="Trump" button_color="red" image={trumpImage} onVote={handleTrumpVote} />
            <CandidateCard label="Kamala" button_color="blue" image={kamalaImage} onVote={handleKamalaVote} />
        </CandidateCardContainer>

        <ProgressBarContainer>
            <div>
                <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Trump {trumpPollNumbers}</p>
                <ProgressBar color="red" percentage={trumpPollNumbers} />
            </div>
            <div>
                <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Kamala {kamalaPollNumbers}</p>
                <ProgressBar color="blue" percentage={kamalaPollNumbers} />
            </div>
        </ProgressBarContainer>
    </>
  );
};

export default VoteSelection;
