import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Container from '@/components/common/Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>Hello</Container>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Container className="custom-class">Content</Container>);
    const div = screen.getByText('Content');
    expect(div.className).toContain('custom-class');
  });

  it('applies default container classes', () => {
    render(<Container>Content</Container>);
    const div = screen.getByText('Content');
    expect(div.className).toContain('container');
    expect(div.className).toContain('mx-auto');
  });

  it('renders nested elements', () => {
    render(
      <Container>
        <span data-testid="nested">Nested</span>
      </Container>,
    );
    expect(screen.getByTestId('nested')).toBeInTheDocument();
  });

  it('spreads additional props', () => {
    render(<Container data-testid="container">Content</Container>);
    expect(screen.getByTestId('container')).toBeInTheDocument();
  });
});
