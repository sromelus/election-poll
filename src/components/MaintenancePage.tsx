import { styled } from 'styled-components';

const MaintenanceContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
`;

const Message = styled.p`
  font-size: 1.2rem;
  color: #34495e;
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const EstimatedTime = styled.p`
  font-size: 1rem;
  color: #7f8c8d;
  margin-top: 2rem;
`;

const MaintenancePage = () => {
  return (
    <MaintenanceContainer>
      <Title>We'll be back soon!</Title>
      <Message>
        We're currently performing some maintenance on our site to serve you better.
      </Message>
      <Message>
        Thank you for your patience.
      </Message>
      <EstimatedTime>
        Expected downtime: 2 days
      </EstimatedTime>
    </MaintenanceContainer>
  );
};

export default MaintenancePage;