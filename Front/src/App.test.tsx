import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);
  await waitFor(() => !screen.getByText(/Loading..../i));
  const linkElement = screen.getByText(/Aller sur panier/i);
  expect(linkElement).toBeInTheDocument();
});
