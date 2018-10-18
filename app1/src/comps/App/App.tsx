import { bar } from '@monorepo/common/foo';
import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <Header>Welcome to Monorepo Webapp 1!</Header>
      <InfoText>{bar()}</InfoText>
    </>
  );
};

const InfoText = styled.span`
  color: #00aacc;
`;

export default App;
