import { fireEvent, screen } from '@testing-library/react';
import { Login } from './Login';
import React from 'react';
import { makeTestStore, testRender } from '../../setupTests';
import { initialState } from '../../redux';
import { REQUEST_STATUS } from '../../redux/actions';

describe('Login tests', () => {
  let store;
  beforeEach(() => {
    store = makeTestStore({ initialState, useMockStore: true });
  });

  test('try login', () => {
    initialState.todo.requestStatus = REQUEST_STATUS.SUCCESS;
    store = makeTestStore({ initialState, useMockStore: true });
    const username = 'admin';
    const password = '123';

    testRender(<Login />, { store });
    const submit = screen.getByTestId('submit-login');
    const loginField = screen.getByTestId('login');
    const passwordField = screen.getByTestId('password');
    fireEvent.input(loginField, { target: { value: username } });
    fireEvent.input(passwordField, { target: { value: password } });
    fireEvent.click(submit);

    expect(store.dispatch).toBeCalled();
  });

  test('Render login form', () => {
    const store = makeTestStore({ initialState, useMockStore: true });
    testRender(<Login />, { store });
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
