import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders Smart Prescription authentication portal header', () => {
  render(<App />);
  const portalHeading = screen.getByText(/Smart Prescription/i);
  expect(portalHeading).toBeInTheDocument();
});
