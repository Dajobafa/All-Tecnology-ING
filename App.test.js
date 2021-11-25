import { render, screen } from '@testing-library/react';
import App from './App';
import Routes from './src/routes/routes';

test('renders learn react link', () => {
  render(<Routes />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
