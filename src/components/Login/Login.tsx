import React, { FormEvent, useState } from 'react';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions';

export const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    dispatch(login(username, password));
  }

  return (
    <form onSubmit={handleSubmit} action="#" data-testid="login-form" className="login-form">
      <h1 className="login-header">Nice to see you!</h1>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Enter login"
        className="login-input"
        type="text"
        name="login"
        data-testid="login"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
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
