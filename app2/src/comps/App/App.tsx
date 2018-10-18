import { bar } from '@monorepo/common/foo';
import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <h1>Welcome to Monorepo Webapp 2!</h1>
      <InfoText>{bar()}</InfoText>
    </>
  );
};

const InfoText = styled.span`
  color: #aa11ff;
`;

export default App;
