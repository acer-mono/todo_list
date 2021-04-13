import React from 'react';
import { Counter } from './Counter';
import { screen } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import { initialState } from '../../redux/reducers/todos';

describe('Counter tests', () => {
  const list = [
    {
      id: '1',
      isChecked: true,
      title: 'Hello',
      position: 0
    },
    {
      id: '2',
      isChecked: false,
      title: 'World',
      position: 1
    }
  ];
  test('Counter shows valid info', () => {
    const state = { ...initialState, list };
    const store = makeTestStore({ initialState: state, useMockStore: true });
    testRender(<Counter />, { store });
    const componentAll = screen.getByTestId('counter-all');
    const componentDone = screen.getByTestId('counter-done');
    const componentNotDone = screen.getByTestId('counter-not-done');
    expect(componentAll.textContent).toEqual('2');
    expect(componentDone.textContent).toEqual('1');
    expect(componentNotDone.textContent).toEqual('1');
  });
});
