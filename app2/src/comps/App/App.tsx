import { Header } from '@monorepo/common/comps';
import { bar } from '@monorepo/common/foo';
import React from 'react';
import WarningText from 'src/comps/WarningText';

const App = () => {
  return (
    <>
      <Header>Welcome to Monorepo Webapp 2!</Header>
      <WarningText>{bar()}</WarningText>
    </>
  );
};

export default App;
