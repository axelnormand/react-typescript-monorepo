import { comps, foo } from '@monorepo/common';
import React from 'react';
import styled from 'styled-components';

const App = () => {
  return (
    <>
      <comps.Header>Welcome to Monorepo Webapp 1!</comps.Header>
      <InfoText>{foo.bar()}</InfoText>
    </>
  );
};

const InfoText = styled.span`
  color: #00aacc;
`;

export default App;
