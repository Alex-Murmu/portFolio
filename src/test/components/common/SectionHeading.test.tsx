import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from '@/components/common/SectionHeading';

describe('SectionHeading', () => {
  it('renders subheading and heading', () => {
    render(<SectionHeading subHeading="Featured" heading="Projects" />);
    expect(screen.getByText('Featured')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });

  it('renders heading as h1', () => {
    render(<SectionHeading subHeading="About" heading="Me" />);
    const heading = screen.getByText('Me');
    expect(heading.tagName).toBe('H1');
  });

  it('renders subheading as p', () => {
    render(<SectionHeading subHeading="Sub" heading="Head" />);
    const sub = screen.getByText('Sub');
    expect(sub.tagName).toBe('P');
  });
});
