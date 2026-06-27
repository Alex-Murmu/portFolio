import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('next-view-transitions', () => ({
  Link: ({ href, children, className, target }: any) =>
    <a href={href} className={className} target={target}>{children}</a>,
}));

import Skill from '@/components/common/Skill';

describe('Skill', () => {
  const defaultProps = {
    name: 'TypeScript',
    href: 'https://typescriptlang.org/',
    children: <span data-testid="icon">TS</span>,
  };

  it('renders skill name', () => {
    render(<Skill {...defaultProps} />);
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('renders children (icon)', () => {
    render(<Skill {...defaultProps} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('links to the provided href', () => {
    render(<Skill {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://typescriptlang.org/');
  });

  it('opens in new tab', () => {
    render(<Skill {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
