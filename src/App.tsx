import { useCallback, useMemo, useState, useEffect, useRef } from 'react';
import { Analytics } from '@vercel/analytics/react';
import Modal from 'react-modal';
import Header from './components/Header';
import VoteSelection from './components/voteSelectionContainer/VoteSelection';
import ChatBubble from './components/ChatBubble';
import styled from 'styled-components';
import AlertMessage from './components/AlertMessage';
import { config } from './config/env';

const ChatContainer = styled.div`
  position: absolute;
  top: 0px;
  max-height: 100vh;
  overflow-y: auto;
  box-shadow: inset 0 0 10px blue;
  max-height: 100vh;
  overflow-y: auto;

  @media (min-width: 768px) {
    top: 80px;
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

const ToggleChatButton = styled.button<{ $isGlowing: boolean }>`
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 1000;
  background-color: #000;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
  margin: 0;
  font-weight: bold;
  box-shadow: 0 0 10px 0px rgba(0, 0, 0, 1);

  &:hover {
    background-color: #000000bb;
  }

  ${props => props.$isGlowing && `
    animation: glow 1s ease-in-out infinite alternate;
    background-color: #dc3545;  // Red color when glowing
  `}

  @keyframes glow {
    from {
      box-shadow: 0 0 5px #dc3545, 0 0 10px #dc3545, 0 0 15px #dc3545;
    }
    to {
      box-shadow: 0 0 10px #dc3545, 0 0 20px #dc3545, 0 0 30px #dc3545;
    }
  }
`;

Modal.setAppElement('#root');

function App() {
  const [showShareLink, setShowShareLink] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [hideChat, setHideChat] = useState<boolean>(true);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [isGlowing, setIsGlowing] = useState(false);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    //scroll chat container to bottom
    if (!hideChat && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [hideChat, chatMessages]);

  const letChildAddChatMessages = useCallback((messages: []) => {
    setChatMessages(messages);

    const chatMessagesUpdated = messages.some((msg: string) => msg === 'updated');

    console.log('chatMessagesUpdated', chatMessagesUpdated);
    if (hideChat && chatMessagesUpdated) {
      console.log('chatMessagesUpdated', chatMessagesUpdated);
      setIsGlowing(true);
      setTimeout(() => setIsGlowing(false), 5000);
    }
  }, [hideChat]);

  const handleSendMessage = () => {
    if (newMessage.trim().length === 0) {
      return;
    }

    setChatMessages([...chatMessages, newMessage]);

    fetch(`${config.apiUrl}/api/votes/chat`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ chatMessage: newMessage }),
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        setAlertMessage(data.error)
      }
    })

    setNewMessage('');
  };

  const toggleShareLink = () => {
    setShowShareLink(!showShareLink);
  };

  const memoizedVoteSelection = useMemo(() => (
    <VoteSelection
      showShareLink={showShareLink}
      sendChatMessagesToParent={letChildAddChatMessages}
    />
  ), [showShareLink, letChildAddChatMessages]);

  return (
    <AppContainer>
      <Header />
      <AlertMessage message={alertMessage} />
      {memoizedVoteSelection}
      <ChatContainer ref={chatContainerRef}>
        {!hideChat && (
          <>
            {chatMessages.map((message, index) => (
                <ChatBubble key={index} message={message} $isLast={index === chatMessages.length - 1} />
            ))}

            {chatMessages.length > 0 && (
              <InputContainer>
                <MessageInput
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  maxLength={80}
                />
                <SendButton onClick={handleSendMessage}>Send</SendButton>
              </InputContainer>
            )}
          </>
        )}
        <ToggleChatButton
          onClick={() => setHideChat(!hideChat)}
          $isGlowing={isGlowing}
        >
          {hideChat ? `Show Chat (${chatMessages.length})` : 'Hide Chat'}
        </ToggleChatButton>
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
