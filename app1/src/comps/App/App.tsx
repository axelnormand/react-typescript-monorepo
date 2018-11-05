import { Header } from '@monorepo/common/comps';
import { bar } from '@monorepo/common/foo';
import React from 'react';
import InfoText from 'src/comps/InfoText';

const App = () => {
  return (
    <>
      <Header>Welcome to Monorepo Webapp 1!</Header>
      <InfoText>{bar()}</InfoText>
    </>
  );
};

export default App;
