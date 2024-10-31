import styled from 'styled-components';

const AlertContainer = styled.div`
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #f8d7da;
    color: #721c24;
    padding: 12px 24px;
    border-radius: 4px;
    border: 1px solid #f5c6cb;
    z-index: 1000;
    animation: fadeOut 5s ease-in-out;
    animation-fill-mode: forwards;

    @keyframes fadeOut {
        0% { opacity: 1 }
        80% { opacity: 1 }
        100% { opacity: 0 }
    }
`;

interface AlertMessageProps {
    message: string;
}

const AlertMessage = ({ message }: AlertMessageProps) => {
    return message ? <AlertContainer>{message}</AlertContainer> : null;
};

export default AlertMessage;