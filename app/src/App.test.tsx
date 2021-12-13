import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const canvas = screen.getByTestId("main-canvas");
  expect(canvas).toBeInTheDocument();
});
