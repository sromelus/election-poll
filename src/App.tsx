import { Analytics } from '@vercel/analytics/react';
import Modal from 'react-modal';
import Header from './components/Header';
import VoteSelection from './components/voteSelectionContainer/VoteSelection';
import ChatBubble from './components/ChatBubble';
import { styled } from 'styled-components';
import { useState } from 'react';

const ChatContainer = styled.div`
  position: absolute;
  top: 0px;

  @media (min-width: 768px) {
    top: 120px;
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

  const handleShowShareLink = () => {
    setShowShareLink(!showShareLink);
  };

  return (
    <AppContainer>
      <Header />
      <VoteSelection showShareLink={showShareLink} />
      {/* <ChatContainer>
        <ChatBubble message="Hello there!" />
        <ChatBubble message="Hi! How are you?" />
        <ChatBubble message="I'm fine, thank you!" />
        <ChatBubble message="What's your name?" />
        <ChatBubble message="What's your name?" />
      </ChatContainer> */}
      <StyledFooter>
        © 2024 pollnest.com <span>| </span>
        <a href="mailto:support@pollnest.com">Contact Me</a> <span>| </span>
        <span style={{cursor: 'pointer', textDecoration: 'underline', color: 'blue', display: "inline-block"}} onClick={handleShowShareLink}>Share with Friends</span>
      </StyledFooter>
      <Analytics />
    </AppContainer>
  );
}

export default App;
