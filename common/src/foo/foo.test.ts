import { bar } from './foo';

test('bar', () => {
  expect(bar()).toContain('common');
});
