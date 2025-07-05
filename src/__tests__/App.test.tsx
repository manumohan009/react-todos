import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it('displays the todo app title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/React Todos App/i)).toBeInTheDocument();
  });
});
