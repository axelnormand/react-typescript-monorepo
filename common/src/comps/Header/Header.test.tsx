import React from 'react';
import { render } from 'react-testing-library';
import Header, { HeaderProps } from './Header';

const props: HeaderProps = {
  children: 'Test',
};

test('renders', () => {
  const { container, getByText } = render(<Header {...props} />);
  const textNode = getByText(props.children);
  expect(textNode).toBeDefined();
  expect(container.firstChild).toHaveStyleRule('font-size', '35px');
  expect(container).toMatchSnapshot();
});
