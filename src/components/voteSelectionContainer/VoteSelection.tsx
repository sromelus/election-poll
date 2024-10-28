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
    const [trumpPollNumbers, setTrumpPollNumbers] = useState<number>(13);
    const [kamalaPollNumbers, setKamalaPollNumbers] = useState<number>(34);
    const [gender, setGender] = useState<string>('');
    const [ethnicity, setEthnicity] = useState<string>('');

    const handleTrumpVote = () => {
        setTrumpPollNumbers(trumpPollNumbers + 1)
    }

    const handleKamalaVote = () => {
        setKamalaPollNumbers(kamalaPollNumbers + 1)
    }


  return (
    <>
        <CandidateCardContainer>
            <CandidateCard
                label="Trump"
                button_color="red"
                image={trumpImage}
                onVote={handleTrumpVote}
                gender={gender}
                setGender={setGender}
                ethnicity={ethnicity}
                setEthnicity={setEthnicity}
            />
            <CandidateCard
                label="Kamala"
                button_color="blue"
                image={kamalaImage}
                onVote={handleKamalaVote}
                gender={gender}
                setGender={setGender}
                ethnicity={ethnicity}
                setEthnicity={setEthnicity}
            />
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

        {gender && ethnicity && (
            <p>You are a {ethnicity.toLowerCase()} {gender.toLowerCase()} showing for Trump {trumpPollNumbers} votes, Kamala {kamalaPollNumbers} votes</p>
        )}
    </>
  );
};

export default VoteSelection;
