import React from 'react';
import styled from 'styled-components';

export interface HeaderProps {
  children: string;
}

const Header: React.SFC<HeaderProps> = ({ children }) => (
  <StyledHeader>{children}</StyledHeader>
);

const StyledHeader = styled.h1`
  font-size: 35px;
  color: #fbc121;
`;

export default Header;
