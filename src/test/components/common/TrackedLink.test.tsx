import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

vi.mock('next-view-transitions', () => ({
  Link: ({ href, children, className, onClick }: any) =>
    <a href={href} className={className} onClick={onClick}>{children}</a>,
}));

import { TrackedLink } from '@/components/common/TrackedLink';

describe('TrackedLink', () => {
  it('renders children', () => {
    render(<TrackedLink href="/test">Click me</TrackedLink>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with correct href', () => {
    render(<TrackedLink href="/projects">Projects</TrackedLink>);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/projects');
  });

  it('renders without track prop', () => {
    render(<TrackedLink href="/">Home</TrackedLink>);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('accepts custom className', () => {
    render(
      <TrackedLink href="/" className="custom-link">Link</TrackedLink>,
    );
    expect(screen.getByRole('link').className).toContain('custom-link');
  });
});
