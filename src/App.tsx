import { useCallback } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Modal from 'react-modal';
import Header from './components/Header';
import VoteSelection from './components/voteSelectionContainer/VoteSelection';
import ChatBubble from './components/ChatBubble';
import styled from 'styled-components';
import { useState } from 'react';

const ChatContainer = styled.div`
  position: absolute;
  top: 0px;

  @media (min-width: 768px) {
    top: 100px;
    // Show all messages on desktop
    & > * {
      display: block;
    }
  }

  @media (max-width: 767px) {
    // Ensure container doesn't overflow on mobile
    max-height: 45vh;
    overflow-y: auto;
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledFooter = styled.footer`
  margin-top: auto;
  text-align: center;
  padding: 1rem;

  @media (max-width: 768px) {
    margin: 25px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #e9ecef;
  opacity: 0.7;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  margin-right: 8px;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

Modal.setAppElement('#root');

function App() {
  const [showShareLink, setShowShareLink] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
      fetch(`${process.env.REACT_APP_API_URL}/chat`, {
        method: 'POST',
        body: JSON.stringify({ message: newMessage }),
      });
      setNewMessage('');
  };

  const toggleShareLink = () => {
    setShowShareLink(!showShareLink);
  };

  const handleAddChatMessage = useCallback((messages: []) => {
    setChatMessages(messages);
  }, []);

  return (
    <AppContainer>
      <Header />
      <VoteSelection showShareLink={showShareLink} addChatMessages={handleAddChatMessage} />
      <ChatContainer>
        {chatMessages.reverse().map((message, index) => (
          <ChatBubble key={index} message={message} $isLast={index === 0} />
        ))}

        <InputContainer>
          <MessageInput
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            maxLength={62}
          />
        <SendButton onClick={handleSend}>Send</SendButton>
      </InputContainer>
      </ChatContainer>
      <StyledFooter>
        © 2024 pollnest.com <span>| </span>
        <a href="mailto:support@pollnest.com">Contact Me</a> <span>| </span>
        <span style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue', display: "inline-block"}} onClick={toggleShareLink}>Share with Friends</span>
      </StyledFooter>
      {process.env.NODE_ENV === 'production' && <Analytics />}
    </AppContainer>
  );
}

export default App;
