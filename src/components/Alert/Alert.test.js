import React from 'react';
import { Alert } from './Alert';
import { screen } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import { initialState } from '../../redux';

describe('Alert tests', () => {
  test('Alert is shown', () => {
    const errors = [
      { id: 0, title: 'hello' },
      { id: 1, title: 'hello' }
    ];
    const store = makeTestStore({
      initialState: { ...initialState, todo: { errors } },
      useMockStore: true
    });
    testRender(<Alert />, { store });
    const component = screen.getByTestId('alert');
    expect(component).toBeInTheDocument();
  });

  test('Alert shows all errors', () => {
    const errors = [
      { id: 0, title: 'hello' },
      { id: 1, title: 'hello' }
    ];
    const store = makeTestStore({
      initialState: { ...initialState, todo: { errors } },
      useMockStore: true
    });
    testRender(<Alert />, { store });
    let components = screen.getAllByTestId('error');
    expect(components).toHaveLength(errors.length);
  });

  test('Alert with empty messages is not shown', () => {
    const store = makeTestStore({ initialState, useMockStore: true });
    testRender(<Alert />, { store });
    const component = screen.queryByTestId('alert');
    expect(component).toBeNull();
  });
});
