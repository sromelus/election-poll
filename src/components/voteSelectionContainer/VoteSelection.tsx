import { useEffect, useState } from 'react';
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
    const [trumpPollNumbers, setTrumpPollNumbers] = useState<number>(0);
    const [kamalaPollNumbers, setKamalaPollNumbers] = useState<number>(0);
    const [gender, setGender] = useState<string>('');
    const [ethnicity, setEthnicity] = useState<string>('');
    const [maxPercentage, setMaxPercentage] = useState<number>(100)

    useEffect(() => {
        getVotes()
    }, [trumpPollNumbers, kamalaPollNumbers]);

    const getVotes = () => {
        fetch('http://localhost:8080/api/votes')
            .then(response => response.json())
            .then(data => {
                setTrumpPollNumbers(data.trump)
                setKamalaPollNumbers(data.kamala)
            })
            .catch(error => {
                console.error('Error fetching vote selection data:', error);
            });
    }

    const postVote = (candidate: string) => {
        const data = { candidate: candidate }
        fetch('http://localhost:8080/api/votes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
    }

    const updateMaxPercentageReached = () => {
        const highestPollPercentage = Math.max(trumpPollNumbers, kamalaPollNumbers)
        const ratio = highestPollPercentage / maxPercentage;
        if (ratio > 0.75) {
            setMaxPercentage(maxPercentage * 5)
        }
    };

    const handleTrumpVote = () => {
        setTrumpPollNumbers(trumpPollNumbers + 1)
        updateMaxPercentageReached()
        postVote('trump')
        setGender('')
        setEthnicity('')
    }

    const handleKamalaVote = () => {
        setKamalaPollNumbers(kamalaPollNumbers + 1)
        updateMaxPercentageReached()
        postVote('kamala')
        setGender('')
        setEthnicity('')
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
                    <ProgressBar color="red" percentage={trumpPollNumbers} maxPercentage={maxPercentage} />
                </div>
                <div>
                    <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>Kamala {kamalaPollNumbers}</p>
                    <ProgressBar color="blue" percentage={kamalaPollNumbers} maxPercentage={maxPercentage} />
                </div>
            </ProgressBarContainer>

            <div>
                <p>You are a {ethnicity.toLowerCase()} {gender.toLowerCase()} showing for Trump {trumpPollNumbers} votes, Kamala {kamalaPollNumbers} votes</p>
            </div>
        </>
    );
};

export default VoteSelection;
