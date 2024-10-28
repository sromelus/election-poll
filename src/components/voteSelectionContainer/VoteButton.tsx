import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button<{ color: string }>`
  background-color: ${({ color }) => color};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
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
