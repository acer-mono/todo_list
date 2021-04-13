import { render, screen } from '@testing-library/react';
import { Login } from './Login';
import React from 'react';

describe('Login tests', () => {
  test('Render login form', () => {
    render(<Login />);
    const loginForm = screen.getByTestId('login-form');
    const nameInput = screen.getByTestId('login');
    const passwordInput = screen.getByTestId('password');
    const submitButton = screen.getByTestId('submit-login');
    expect(loginForm).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });
});
