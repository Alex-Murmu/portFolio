import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/common/Footer';

describe('Footer', () => {
  it('renders developer name', () => {
    render(<Footer />);
    expect(screen.getByText(/Alex Murmu/)).toBeInTheDocument();
  });

  it('renders the current year', () => {
    const { container } = render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(container.textContent).toContain(year);
  });
});
