import { bar } from '@monorepo/common/foo';
import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <h1>Welcome to Monorepo Webapp 1!</h1>
      <InfoText>{bar()}</InfoText>
    </>
  );
};

const InfoText = styled.span`
  color: #00aacc;
`;

export default App;
