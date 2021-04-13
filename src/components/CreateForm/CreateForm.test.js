import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { makeTestStore, testRender } from '../../setupTests';
import { REQUEST_STATUS } from '../../redux/actions';

describe('CreateForm tests', () => {
  let store;
  beforeEach(() => {
    store = makeTestStore({ useMockStore: true });
  });

  test('create item with valid title', () => {
    testRender(<CreateForm />, { store });

    const field = 'some text';
    const input = screen.getByTestId('create-input');
    const button = screen.getByTestId('create-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.input(input, { target: { value: field } });
    fireEvent.click(button);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: { requestStatus: REQUEST_STATUS.LOADING }
    });
  });
});
