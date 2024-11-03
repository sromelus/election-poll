import styled from 'styled-components';
import { useState } from 'react';
import Modal from 'react-modal';
import { capitalize } from '../../lib/textUtils';

const StyledButton = styled.button<{ color: string, disabled: boolean }>`
  background-color: ${({ color, disabled }) => disabled ? 'gray' : color};
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
  opacity: ${({ disabled }) => disabled ? 0.5 : 1};
  pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: translateY(2px);
  }
`;

const StyledModalBody = styled.div`
  @media (max-width: 768px) {
    font-size: 0.8rem;
    max-width: 300px;
  }
`;

const StyledLabel = styled.label<{ checked: boolean, color: string }>`
  display: inline-block;
  padding: 8px 16px;
  border: 2px solid #ccc;
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  background: white;
  transition: all 0.2s;

  input {
    display: none;
  }

  &:hover {
    border-color: ${({ color }) => color || '#666'};
  }

  ${({ checked, color }) => checked && `
    background: ${color || '#666'};
    color: white;
    border-color: ${color || '#666'};
  `}
`;

interface VoteButtonProps {
  label: string;
  color: string;
  onClick: () => void;
  gender: string;
  setGender: (gender: string) => void;
  ethnicity: string;
  setEthnicity: (ethnicity: string) => void;
  disabled: boolean;
}

const VoteButton = ({
  label,
  color,
  onClick,
  gender,
  setGender,
  ethnicity,
  setEthnicity,
  disabled
}: VoteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

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
      <StyledButton color={color} disabled={disabled} onClick={handleClick}>
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
        <StyledModalBody>
          {showError && (
            <div style={{
                    color: '#dc3545',
                    marginBottom: '15px',
                    fontWeight: 'bold',
                  }}>
              <p>Please make a selection for both</p>
              <ul>
                  <li>gender</li>
                  <li>ethnicity</li>
              </ul>
            </div>
          )}
          <h2>What are you?</h2>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Gender:</div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <StyledLabel checked={gender === 'male'} color={color}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                Male
              </StyledLabel>
              <StyledLabel checked={gender === 'female'} color={color}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Female
              </StyledLabel>
              <StyledLabel checked={gender === 'non-binary'} color={color}>
                <input
                  type="radio"
                  name="gender"
                  value="non-binary"
                  checked={gender === 'non-binary'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Non-binary
              </StyledLabel>
              <StyledLabel checked={gender === 'other'} color={color}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === 'other'}
                  onChange={(e) => setGender(e.target.value)}
                />
                Other
              </StyledLabel>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>Ethnicity:</div>
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <StyledLabel checked={ethnicity === 'white'} color={color}>
                <input
                  type="radio"
                  name="ethnicity"
                  value="white"
                  checked={ethnicity === 'white'}
                  onChange={(e) => setEthnicity(e.target.value)}
                  required
                /> White
              </StyledLabel>
              <StyledLabel checked={ethnicity === 'black'} color={color}>
                <input
                  type="radio"
                  name="ethnicity"
                  value="black"
                  checked={ethnicity === 'black'}
                  onChange={(e) => setEthnicity(e.target.value)}
                /> Black
              </StyledLabel>
              <StyledLabel checked={ethnicity === 'hispanic'} color={color}>
                <input
                  type="radio"
                  name="ethnicity"
                  value="hispanic"
                  checked={ethnicity === 'hispanic'}
                  onChange={(e) => setEthnicity(e.target.value)}
                /> Hispanic
              </StyledLabel>
              <StyledLabel checked={ethnicity === 'asian'} color={color}>
                <input
                  type="radio"
                  name="ethnicity"
                  value="asian"
                  checked={ethnicity === 'asian'}
                  onChange={(e) => setEthnicity(e.target.value)}
                /> Asian
              </StyledLabel>
              <StyledLabel checked={ethnicity === 'other'} color={color}>
                <input
                  type="radio"
                  name="ethnicity"
                  value="other"
                  checked={ethnicity === 'other'}
                  onChange={(e) => setEthnicity(e.target.value)}
                /> Other
              </StyledLabel>
            </div>
          </div>

          <p>Are you sure you want to show support for {capitalize(label)}?</p>
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
        </StyledModalBody>
      </Modal>
    </>
  );
};

export default VoteButton;
