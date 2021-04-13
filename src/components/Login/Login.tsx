import React from 'react';

export const Login = () => {
  return (
    <form action="#" data-testid="login-form">
      <input type="text" name="login" data-testid="login" />
      <input type="text" name="password" data-testid="password" />
      <button type="submit" data-testid="submit-login">
        Login
      </button>
    </form>
  );
};
