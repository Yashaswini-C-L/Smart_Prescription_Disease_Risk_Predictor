import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders Smart Prescription foundation heading', () => {
  render(<App />);
  const mainHeading = screen.getByRole('heading', {
    name: /Smart Prescription & Disease Risk Predictor/i,
    level: 1
  });
  expect(mainHeading).toBeInTheDocument();
});
