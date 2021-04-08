import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CreateForm } from './CreateForm';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { makeTestStore, testRender } from '../../setupTests';
import { addError } from '../../redux/actions';

describe('CreateForm tests', () => {
  let store;
  beforeEach(() => {
    store = makeTestStore();
  });

  test('create item with valid title', () => {
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

  test('try to create item with empty title', () => {
    testRender(<CreateForm />, { store });

    const field = '';
    const input = screen.queryByTestId('create-input');
    const button = screen.queryByTestId('create-button');

    fireEvent.input(input, { target: { value: field } });
    fireEvent.click(button);

    expect(store.dispatch).toBeCalledWith(
      addError({ error: 'Название задачи не может быть пустым' })
    );
  });
});
