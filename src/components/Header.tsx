import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  text-align: center;
  padding: 20px;
  font-size: 32px;
  font-weight: bold;
`;

const Header = () => {
  return (
    <HeaderContainer>
      Who Are You Supporting This Election?
    </HeaderContainer>
  );
};

export default Header;
