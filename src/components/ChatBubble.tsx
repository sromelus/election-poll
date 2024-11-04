import { styled } from 'styled-components';

interface ChatBubbleProps {
  message: string;
  $isLast?: boolean;
}

const BubbleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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

const Bubble = styled.div<{ $isLast: boolean }>`
  background-color: ${props => props.$isLast ? '#007bff' : '#e9ecef'};
  color: ${props => props.$isLast ? '#fff' : '#000'};
  padding: 8px 16px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  opacity: 0.8;
`;

const ChatBubble = ({ message, $isLast = false }: ChatBubbleProps) => {
  return (
    <BubbleContainer>
      <Bubble $isLast={$isLast}>
        {message}
      </Bubble>
    </BubbleContainer>
  );
};

export default ChatBubble;