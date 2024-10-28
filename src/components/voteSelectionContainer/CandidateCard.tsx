import React from 'react';
import styled from 'styled-components';
import VoteButton from './VoteButton';

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  text-align: center;
  width: 150px;
`;

interface CandidateCardProps {
  name: string;
  label: string;
  button_color: string;
  onVote: () => void;
}

const CandidateCard = ({ name, label, button_color, onVote }: CandidateCardProps) => (
  <Card>
    <div style={{ width: '50px', height: '50px', borderRadius: '50px', border: '1px solid black' }}>
        <img src='' alt={`${name}'s avatar`} style={{ width: '100%', borderRadius: '8px' }} />
    </div>
    <VoteButton label={label} color={button_color} onClick={onVote} />
  </Card>
);

export default CandidateCard;
