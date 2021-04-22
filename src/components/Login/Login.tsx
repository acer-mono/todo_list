import React from 'react';
import './Login.css';

export const Login = () => {
  return (
    <form action="#" data-testid="login-form" className="login-form">
      <h1 className="login-header">Nice to see you!</h1>
      <input
        placeholder="Enter login"
        className="login-input"
        type="text"
        name="login"
        data-testid="login"
      />
      <input
        placeholder="Enter password"
        className="login-input"
        type="password"
        name="password"
        data-testid="password"
      />
      <button className="login-submit" type="submit" data-testid="submit-login">
        Login
      </button>
    </form>
  );
};
