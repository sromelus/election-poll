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

Modal.setAppElement('#root');

function App() {
  const [showShareLink, setShowShareLink] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);

  const toggleShareLink = () => {
    setShowShareLink(!showShareLink);
  };

  const handleAddChatMessage = useCallback((message: string) => {
    setChatMessages(prev => {
        const updatedMessages = prev.length >= 10 ? prev.slice(1) : prev;
        return [...updatedMessages, message];
    });
}, []);

  return (
    <AppContainer>
      <Header />
      <VoteSelection showShareLink={showShareLink} addChatMessage={handleAddChatMessage} />
      <ChatContainer>
        {chatMessages.map((message, index) => (
          <ChatBubble key={index} message={message} />
        ))}
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
