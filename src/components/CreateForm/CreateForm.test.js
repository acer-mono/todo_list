import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { makeTestStore, testRender } from '../../setupTests';

describe('CreateForm tests', () => {
  let store;
  beforeEach(() => {
    store = makeTestStore();
  });

  test('create item with valid name', () => {
    testRender(<CreateForm />, { store });

    const field = 'some text';
    const input = screen.getByTestId('create-input');
    const button = screen.getByTestId('create-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(button);

    expect(store.dispatch).toBeCalledWith(
      expect.objectContaining({
        type: ACTION_TYPES.CREATE,
        payload: {
          item: expect.objectContaining({ name: field })
        }
      })
    );
  });

  test('try to create item with empty name', () => {
    testRender(<CreateForm />, { store });

    const field = '';
    const input = screen.queryByTestId('create-input');
    const button = screen.queryByTestId('create-button');
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(button);
    expect(alert).toHaveBeenCalled();
  });
});
