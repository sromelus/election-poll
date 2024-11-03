import styled from 'styled-components';
import appLogo from '../pollnest-high-resolution-logo-grayscale-transparent copy.png';

const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    font-size: 32px;
  }
`;

const LogoContainer = styled.div`
  position: relative;
  width: 100px;
  display: flex;
  align-items: center;

  @media (min-width: 768px) {
    position: absolute;
    left: 20px;
    height: 130px;
    width: 130px;
  }

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
  }
`;

const TitleContainer = styled.div`
  font-weight: bold;
  text-align: center;
`;

const Header = () => {
  return (
    <>
      <div>
        <HeaderContainer>
          <LogoContainer>
            <img src={appLogo} alt="Logo" />
          </LogoContainer>
          <TitleContainer>
            Who Are You Supporting This Election?{' '}
          </TitleContainer>
        </HeaderContainer>
          <div style={{textAlign: 'center', width: '90%', margin: '-20px auto', fontSize: '10px', borderBottom: '1px solid #ccc'}}>
              <p>This is a non-official poll. It is not affiliated with any political organization.</p>
              <p>It is a fun way to see how people are voting in the 2024 presidential election.</p>
              <p>Votes are anonymous. No personal information is collected.</p>
              <p>Live messaging and map are coming soon!!</p>
          </div>
      </div>
    </>
  );
};

export default Header;
