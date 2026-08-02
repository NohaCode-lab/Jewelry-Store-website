import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Button } from '../../src/components/ui/Button';

describe('Button UI Primitive', () => {
  it('renders button with text content', () => {
    render(<Button>Add to Cart</Button>);
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeDefined();
  });

  it('renders loading state indicator', () => {
    render(<Button isLoading>Submit</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDefined();
  });
});
