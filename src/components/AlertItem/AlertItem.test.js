import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { AlertItem } from './AlertItem';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { makeTestStore, testRender } from '../../setupTests';
import { initialState } from '../../redux';

describe('AlertItem tests', () => {
  test('clear errors action is called after delay', () => {
    jest.useFakeTimers();
    const error = { id: '1', title: 'hello' };
    const store = makeTestStore({ initialState, useMockStore: true });
    testRender(<AlertItem error={error} delay={3} />, { store });
    jest.advanceTimersByTime(3000);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.CLEAR_ERRORS,
      payload: { id: error.id }
    });
  });

  test('clear errors action is called after click on button', () => {
    jest.useFakeTimers();
    const store = makeTestStore({ initialState, useMockStore: true });
    const error = { id: '1', title: 'hello' };
    testRender(<AlertItem error={error} delay={3} />, { store });
    let button = screen.getByTestId('alert-close');
    fireEvent.click(button);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.CLEAR_ERRORS,
      payload: { id: error.id }
    });
  });
});
