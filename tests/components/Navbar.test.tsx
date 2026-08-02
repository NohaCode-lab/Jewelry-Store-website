import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../src/components/layout/Navbar';

describe('Navbar Component & Navigation Architecture', () => {
  it('renders logo and all primary navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Mangata & Gallo')).toBeDefined();
    expect(screen.getAllByText('About').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Designer').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Collections').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Contact').length).toBeGreaterThan(0);
  });

  it('renders toolbar action triggers (AI Concierge, Search, Wishlist, Cart)', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByTitle('AI Luxury Jewelry Concierge')).toBeDefined();
    expect(screen.getByTitle('Search Jewelry (Ctrl+K)')).toBeDefined();
    expect(screen.getByTitle('Saved Wishlist')).toBeDefined();
    expect(screen.getByTitle('Shopping Cart')).toBeDefined();
  });

  it('toggles mobile menu and manages body scroll lock overflow', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const toggleButton = screen.getByTitle('Toggle Navigation');
    expect(toggleButton).toBeDefined();

    // Open mobile drawer
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');

    // Close mobile drawer
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('auto');
  });

  it('closes mobile drawer upon clicking a navigation item', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const toggleButton = screen.getByTitle('Toggle Navigation');
    fireEvent.click(toggleButton);
    expect(document.body.style.overflow).toBe('hidden');

    const mobileAboutButton = screen.getAllByText('About')[1];
    if (mobileAboutButton) {
      fireEvent.click(mobileAboutButton);
      expect(document.body.style.overflow).toBe('auto');
    }
  });
});
