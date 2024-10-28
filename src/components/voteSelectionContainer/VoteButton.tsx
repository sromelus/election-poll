import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ color: string }>`
  background-color: ${({ color }) => color};
  margin-top: 20px;
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: opacity 0.3s;
//   width: 175px;
  border-radius: 20px;
  border: 1px solid #ccc;
  box-shadow: -4px 4px 10px 0px rgba(0, 0, 0, 0.5);

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: translateY(2px);
  }
`;

interface VoteButtonProps {
  label: string;
  color: string;
  onClick: () => void;
}

const VoteButton = ({ label, color, onClick }: VoteButtonProps) => (
  <StyledButton color={color} onClick={onClick}>{label}</StyledButton>
);

export default VoteButton;
