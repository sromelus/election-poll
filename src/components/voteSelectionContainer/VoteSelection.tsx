import { useEffect, useState } from 'react';
import CandidateCard from './CandidateCard';
import ProgressBar from './ProgressBar';
import styled from 'styled-components';
import trumpImage from '../../trump_img.png'
import kamalaImage from '../../kamala_img.png'
import Confetti from 'react-confetti';
import SocialShareButtons from '../SocialShareButtons';
import { capitalize } from '../../lib/textUtils';
import AlertMessage from '../AlertMessage';
import { config } from '../../config/env';

const CandidateCardContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const ProgressBarContainer = styled.div`
  padding: 20px;
  margin-top: 0px;

  @media (min-width: 768px) {
    margin-top: 50px;
  }
`;

const Loader = styled.span`
    display: inline-block;
    width: 40px;
    height: 16px;
    background:
        radial-gradient(circle 3px at 3px center, #000 100%, transparent 0),
        radial-gradient(circle 3px at 3px center, #000 100%, transparent 0);
    background-size: 16px 16px;
    background-repeat: no-repeat;
    position: relative;
    animation: ballX 1s linear infinite;

    &:before {
        content: "";
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #000;
        inset: 0;
        margin:auto;
        animation: moveX 1s cubic-bezier(0.5,300,0.5,-300) infinite;
    }

    @keyframes ballX {
        0%,25%,50%,75%, 100%  {background-position: 25% 0,75% 0}
        40%     {background-position: 25% 0,85% 0}
        90%     {background-position: 15% 0,75% 0}
    }

    @keyframes moveX {
        100% {transform:translate(0.15px)}
    }
`;

const ThankYouContainer = styled.div`
    border: 1px solid #000;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    background-color: #fff;
    font-weight: bold;
    color: green;
    animation: fadeOut 7s ease-in-out;
    animation-fill-mode: forwards;

    @keyframes fadeOut {
        0% {opacity: 1}
        90% {opacity: 1}
        100% {opacity: 0}
    }
`;

const ShareLinkContainer = styled(ThankYouContainer)`
    animation: none;
`;

const CloseButton = styled.button`
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 50px;
    &:hover {
        color: #666
    }
`;

interface VoteSelectionProps {
    showShareLink: boolean;
    sendChatMessagesToParent: (messages: []) => void;
}

const VoteSelection = ({ showShareLink, sendChatMessagesToParent }: VoteSelectionProps) => {
    const [trumpPollNumbers, setTrumpPollNumbers] = useState<number>(0);
    const [kamalaPollNumbers, setKamalaPollNumbers] = useState<number>(0);
    const [gender, setGender] = useState<string>('');
    const [ethnicity, setEthnicity] = useState<string>('');
    const [chatMessage, setChatMessage] = useState<string>('');
    const [maxPercentage, setMaxPercentage] = useState<number>(100)
    const [showThankYou, setShowThankYou] = useState<{show: boolean, candidate: string}>({show: false, candidate: ''})
    const [shareLinkCopied, setShareLinkCopied] = useState<string>('copy link')
    const [showSocialShareButtons, setShowSocialShareButtons] = useState<boolean>(false)
    const [disabledVote, setDisabledVote] = useState<boolean>(true)
    const [showAlreadyVoted, setShowAlreadyVoted] = useState<boolean>(false)
    const [showOutsideUS, setShowOutsideUS] = useState<boolean>(false)
    const [alertMessage, setAlertMessage] = useState<string>('');
    const URL_ENCODED_LINK = 'Show+your+support+for+your+favorite+candidate+in+this+poll.+https%3A%2F%2Fwww.pollnest.com%0D%0A'


    useEffect(() => {
        const pollData = async () => {
            try {
                const [votesResponse, chatResponse] = await Promise.all([
                    fetch(`${config.apiUrl}/api/votes`, {
                        credentials: 'include'
                    }),
                    fetch(`${config.apiUrl}/api/votes/chat`, {
                        credentials: 'include'
                    })
                ]);

                if(votesResponse.status === 429) {
                    setAlertMessage('Too many requests. Please try again in a few minutes.')
                }

                if(chatResponse.status === 429) {
                    setAlertMessage('Too many requests. Please try again in a few minutes.')
                }

                if (votesResponse.status === 503 || chatResponse.status === 503) {
                    setAlertMessage('We are currently under maintenance. Please try again later.');
                    throw new Error('Maintenance mode');
                }

                const [votesData, chatData] = await Promise.all([
                    votesResponse.json(),
                    chatResponse.json()
                ]);

                if(votesData.voteTally && votesData.voteTally.trump){
                    setTrumpPollNumbers(votesData.voteTally.trump);
                    setKamalaPollNumbers(votesData.voteTally.kamala);
                    setDisabledVote(votesData.visitedUser.disabledVote);
                }

                if(votesData.visitedUser && votesData.visitedUser.disabledVote) {
                    setAlertMessage('You have already voted! Click on the share button at the bottom to share with your friends.')
                }

                if(votesData.visitedUser && votesData.visitedUser.isRequestFromOutsideUS) {
                    setShowOutsideUS(true)
                    setAlertMessage('Voting is disabled for users outside the US.')
                }

                if (votesData.chatMessages) {
                    sendChatMessagesToParent(chatData.chatMessages);
                }
            } catch (error) {
                console.error('Error fetching/polling vote selection data:', error);
            }
        };

        // Initial poll
        pollData();

        // Set up polling interval
        const pollInterval = setInterval(pollData, 3000);

        // Cleanup
        return () => clearInterval(pollInterval);
    }, [sendChatMessagesToParent]);

    useEffect(() => {
        setShowSocialShareButtons(showShareLink);
    }, [showShareLink]);

    const postVote = (candidate: string) => {
        const data = {
            candidate: candidate,
            voterGender: gender,
            voterEthnicity: ethnicity,
            chatMessage: chatMessage
        }

        fetch(`${config.apiUrl}/api/votes`, {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(async response => {
            if(response.status === 429) {
                setAlertMessage('You have voted too many times.');
            }
            if(response.status === 503) {
                setAlertMessage('We are currently under maintenance. Please try again later.');
                throw new Error('Maintenance mode');
            }
            return response.json()
        })
        .then(data => {
            setAlertMessage(data.message);
            setTimeout(() => {
                setAlertMessage('');
            }, 5000);
        })
        .catch(error => {
            console.error('Error submitting vote:', error);
        });
    }

    const updateMaxPercentageReached = () => {
        const highestPollPercentage = Math.max(trumpPollNumbers, kamalaPollNumbers)
        const ratio = highestPollPercentage / maxPercentage;
        if (ratio > 0.75) {
            setMaxPercentage(maxPercentage * 5)
        }
    };

    const handleTrumpVote = () => {
        setTrumpPollNumbers(trumpPollNumbers + 1)
        updateMaxPercentageReached()
        postVote('trump')
        handleResetVotes('trump')
    }

    const handleKamalaVote = () => {
        setKamalaPollNumbers(kamalaPollNumbers + 1)
        updateMaxPercentageReached()
        postVote('kamala')
        handleResetVotes('kamala')
    }

    const handleResetVotes = (candidate: string) => {
        setDisabledVote(true)
        setShowThankYou({show: true, candidate: candidate})
        setTimeout(() => {
            setShowThankYou({show: false, candidate: ''})
            setShowSocialShareButtons(true)
        }, 7000)
    }

    const handleCopyShareLink = () => {
        navigator.clipboard.writeText('Show your support for your favorite candidate in this poll! https://www.pollnest.com')
        setShareLinkCopied('copied!')
        setTimeout(() => {
            setShareLinkCopied('copy link')
        }, 3000)
    }

    return (
        <>
            <AlertMessage message={alertMessage} />
            <CandidateCardContainer>
                <CandidateCard
                    label="Trump"
                    button_color="red"
                    image={trumpImage}
                    onVote={handleTrumpVote}
                    gender={gender}
                    setGender={setGender}
                    ethnicity={ethnicity}
                    setEthnicity={setEthnicity}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    disabledVote={disabledVote || showOutsideUS}
                />
                <CandidateCard
                    label="Kamala"
                    button_color="blue"
                    image={kamalaImage}
                    onVote={handleKamalaVote}
                    gender={gender}
                    setGender={setGender}
                    ethnicity={ethnicity}
                    setEthnicity={setEthnicity}
                    chatMessage={chatMessage}
                    setChatMessage={setChatMessage}
                    disabledVote={disabledVote || showOutsideUS}
                />
            </CandidateCardContainer>

            <ProgressBarContainer>
                <div>
                    <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Trump {trumpPollNumbers ? trumpPollNumbers : <Loader />}
                    </p>
                    <ProgressBar color="red" percentage={trumpPollNumbers} maxPercentage={maxPercentage} />
                </div>
                <div>
                    <p style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                        Kamala {kamalaPollNumbers ? kamalaPollNumbers : <Loader />}
                    </p>
                    <ProgressBar color="blue" percentage={kamalaPollNumbers} maxPercentage={maxPercentage} />
                </div>
            </ProgressBarContainer>

            {showThankYou.show && (
                <>
                    <ThankYouContainer>
                        <p>You submitted 1 votes for {capitalize(showThankYou.candidate)}</p>
                        <p>Thank you for showing support!</p>
                    </ThankYouContainer>
                    <Confetti />
                </>
            )}

            {showSocialShareButtons && (
                <ShareLinkContainer>
                    <CloseButton onClick={() => setShowSocialShareButtons(false)}>x</CloseButton>
                    {showAlreadyVoted && <p style={{color: 'red'}}>Yay! You took the poll!</p>}
                    <p>Share this link with your friends!</p>
                    <p>so they can poll too!</p>
                    <a href='https://www.pollnest.com'>pollnest.com</a>
                    <button
                        style={{marginLeft: '10px', fontWeight: 'bold', border: '1px solid lightblue', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer'}}
                        onClick={handleCopyShareLink}
                    >
                        {shareLinkCopied}
                    </button>
                    <SocialShareButtons urlEncodedLink={URL_ENCODED_LINK} />
                </ShareLinkContainer>
            )}

        </>
    );
};

export default VoteSelection;