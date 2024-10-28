import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const Card = styled.div`
  border-radius: 8px;
  padding: 16px;
  text-align: center;

  .image_container {
    border-radius: 300px;
    border: 1px solid #ccc;
    margin: 0 auto;
    box-shadow: -4px 4px 10px 0px rgba(0, 0, 0, 0.5);
  }
`;

interface CandidateCardProps {
  label: string;
  image: string;
  button_color: string;
  onVote: () => void;
  gender: string;
  setGender: (gender: string) => void;
  ethnicity: string;
  setEthnicity: (ethnicity: string) => void;
}

const CandidateCard = ({
  label, 
  button_color, 
  image, 
  onVote,
  gender,
  setGender,
  ethnicity,
  setEthnicity 
}: CandidateCardProps) => (
  <Card>
    <div className="image_container">
        <img src={image} alt={`${label}'s img`} style={{ width: '100%', borderRadius: '300px' }} />
    </div>
    <VoteButton 
      label={label} 
      color={button_color} 
      onClick={onVote}
      gender={gender}
      setGender={setGender}
      ethnicity={ethnicity}
      setEthnicity={setEthnicity}
    />
  </Card>
);

export default CandidateCard;
