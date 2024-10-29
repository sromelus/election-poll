import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 20px;
  font-weight: bold;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const Header = () => {
  return (
    <>
      <HeaderContainer>
        Who Are You Supporting This Election?
      </HeaderContainer>

      <div style={{textAlign: 'center', width: '90%', margin: '-20px auto', fontSize: '10px', borderBottom: '1px solid #ccc'}}>
          <p>This is a non-official poll. It is not affiliated with any political campaign or organization.</p>
          <p>It is a fun way to see how people are voting in the 2024 presidential election.</p>
      </div>
    </>
  );
};

export default Header;
