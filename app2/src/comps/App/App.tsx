import { bar } from '@monorepo/common/foo';
import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <Header>Welcome to Monorepo Webapp 2!</Header>
      <InfoText>{bar()}</InfoText>
    </>
  );
};

const InfoText = styled.span`
  color: #aa11ff;
`;

export default App;
