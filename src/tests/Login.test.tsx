import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../pages/Login';
import { AuthProvider } from '../contexts/AuthContext';

const MockedLogin = ({ onSwitchToRegister }: { onSwitchToRegister: () => void }) => (
  <AuthProvider>
    <Login onSwitchToRegister={onSwitchToRegister} />
  </AuthProvider>
);

describe('Login Component', () => {
  it('renders login form with all fields', () => {
    const mockSwitch = vi.fn();
    render(<MockedLogin onSwitchToRegister={mockSwitch} />);

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    const mockSwitch = vi.fn();
    render(<MockedLogin onSwitchToRegister={mockSwitch} />);

    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('accepts valid input', async () => {
    const mockSwitch = vi.fn();
    render(<MockedLogin onSwitchToRegister={mockSwitch} />);

    const emailInput = screen.getByLabelText(/email address/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
    fireEvent.change(passwordInput, { target: { value: 'validpass' } });

    expect(emailInput).toHaveValue('valid@email.com');
    expect(passwordInput).toHaveValue('validpass');
  });

  it('switches to register form when clicking create account', () => {
    const mockSwitch = vi.fn();
    render(<MockedLogin onSwitchToRegister={mockSwitch} />);

    const createAccountButton = screen.getByText(/create one/i);
    fireEvent.click(createAccountButton);

    expect(mockSwitch).toHaveBeenCalled();
  });
});
