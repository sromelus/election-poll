import { styled } from 'styled-components';

interface ChatBubbleProps {
  message: string;
  isRight?: boolean;
}

const BubbleContainer = styled.div<{ isRight: boolean }>`
  display: flex;
  justify-content: ${props => props.isRight ? 'flex-end' : 'flex-start'};
  margin: 8px 0;
  animation: floatUp 0.3s ease-out;
  
  @keyframes floatUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Bubble = styled.div<{ isRight: boolean }>`
  background-color: ${props => props.isRight ? '#007bff' : '#e9ecef'};
  color: ${props => props.isRight ? '#fff' : '#000'};
  padding: 8px 16px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  opacity: 0.8;
`;

const ChatBubble = ({ message, isRight = false }: ChatBubbleProps) => {
  return (
    <BubbleContainer isRight={isRight}>
      <Bubble isRight={isRight}>
        {message}
      </Bubble>
    </BubbleContainer>
  );
};

export default ChatBubble;