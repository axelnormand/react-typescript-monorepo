import 'jest-dom/extend-expect';
import 'jest-styled-components';
import React from 'react';
import { render } from 'react-testing-library';
import Header, { HeaderProps } from './Header';

const props: HeaderProps = {
  children: 'Test',
};

test('renders', () => {
  const { container, getByText } = render(<Header {...props} />);
  const textNode = getByText(props.children);
  expect(textNode).toBeVisible();
  expect(container.firstChild).toHaveStyleRule('font-size', '35px');
  expect(container).toMatchSnapshot();
});
