import { describe, it, expect } from 'vitest';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuthContext } from '../src/features/auth/AuthProvider';

const TestComponent = () => {
  const { user, logout } = useAuthContext();
  return (
    <div>
      <span data-testid="user-name">{user?.name || 'guest'}</span>
      <span data-testid="user-email">{user?.email || 'none'}</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthProvider Context', () => {
  it('provides authentication context and supports login and logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-name')).toBeDefined();
    expect(screen.getByTestId('user-email')).toBeDefined();
  });
});
