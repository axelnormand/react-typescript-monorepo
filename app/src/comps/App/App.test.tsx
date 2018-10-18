import React from 'react';
import { render } from 'react-testing-library';
import App from './App';

test('renders', () => {
  const { getByText } = render(<App />);
  const headerText = getByText(/Welcome/);
  expect(headerText).toBeDefined();
});
