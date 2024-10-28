import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';
import Modal from 'react-modal';

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
  gender: string;
  setGender: (gender: string) => void;
  ethnicity: string;
  setEthnicity: (ethnicity: string) => void;
}

const VoteButton = ({
  label,
  color,
  onClick,
  gender,
  setGender,
  ethnicity,
  setEthnicity
}: VoteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
    setShowError(false);
  };

  const handleConfirm = () => {
    if (!gender || !ethnicity) {
      setShowError(true);
      return;
    }
    setIsModalOpen(false);
    onClick();
  };

  return (
    <>
      <StyledButton color={color} onClick={handleClick}>
        {label}
      </StyledButton>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '8px',
            border: `2px solid ${color}`,
            minWidth: '300px',
          },
        }}
      >
        {showError && (
          <div style={{ 
            color: '#dc3545', 
            marginBottom: '15px', 
            fontWeight: 'bold' 
          }}>
            Please select both gender and ethnicity before confirming
          </div>
        )}
        <h2>What are you?</h2>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Gender:</div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label>
              <input
                type="radio"
                name="gender"
                value="men"
                checked={gender === 'men'}
                onChange={(e) => setGender(e.target.value)}
                required
              /> Men
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="women"
                checked={gender === 'women'}
                onChange={(e) => setGender(e.target.value)}
              /> Women
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="lgbtq"
                checked={gender === 'lgbtq'}
                onChange={(e) => setGender(e.target.value)}
              /> LGBTQ+
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Ethnicity:</div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="white"
                checked={ethnicity === 'white'}
                onChange={(e) => setEthnicity(e.target.value)}
                required
              /> White
            </label>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="black"
                checked={ethnicity === 'black'}
                onChange={(e) => setEthnicity(e.target.value)}
              /> Black
            </label>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="spanish"
                checked={ethnicity === 'spanish'}
                onChange={(e) => setEthnicity(e.target.value)}
              /> Spanish
            </label>
            <label>
              <input
                type="radio"
                name="ethnicity"
                value="other"
                checked={ethnicity === 'other'}
                onChange={(e) => setEthnicity(e.target.value)}
              /> Other
            </label>
          </div>
        </div>

        <p>Are you sure you want to show support for {label}?</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px' }}>
          <button
            onClick={() => setIsModalOpen(false)}
            style={{
              backgroundColor: 'white',
              color: '#dc3545',
              border: '2px solid #dc3545',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            style={{
              backgroundColor: color,
              color: '#fff',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

export default VoteButton;
