import React from 'react';
import styled from 'styled-components';

const BarContainer = styled.div`
  background-color: #e0e0e0;
  border-radius: 8px;
  width: 100%;
  height: 10px;
  margin-top: 8px;
`;

const Progress = styled.div<{ width: number; color: string }>`
  background-color: ${({ color }) => color};
  width: ${({ width }) => width}%;
  height: 100%;
  border-radius: 8px;
  transition: width 0.3s ease;
`;

interface ProgressBarProps {
    percentage: number;
    color: string;
}

const ProgressBar = ({ color, percentage }: ProgressBarProps) => (
    <BarContainer>
        <Progress color={color} width={percentage} />
    </BarContainer>
);

export default ProgressBar;
