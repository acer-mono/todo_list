import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { EditListItem } from './EditListItemForm';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { makeTestStore, testRender } from '../../setupTests';
import { REQUEST_STATUS } from '../../redux/actions';
import { initialState } from '../../redux/store';

const item = {
  id: '123',
  title: 'first'
};

describe('EditListItemForm tests', () => {
  let store;
  beforeEach(() => {
    store = makeTestStore({ initialState, useMockStore: true });
  });

  test('form contains input with passed value and button', () => {
    testRender(<EditListItem item={item} />, { store });
    const form = screen.getByTestId('editForm');
    const input = screen.getByTestId('edit-input');
    const button = screen.getByTestId('edit-button');

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(item.title);
    expect(button).toBeInTheDocument();
  });

  test('submit form with valid title', () => {
    const closeItemHandler = jest.fn();
    const field = 'some new title';

    testRender(<EditListItem item={item} closeItem={closeItemHandler} />, { store });
    const form = screen.getByTestId('editForm');
    const input = screen.getByTestId('edit-input');

    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.submit(form);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: { requestStatus: REQUEST_STATUS.LOADING }
    });
    expect(closeItemHandler).toHaveBeenCalled();
  });

  test('click on close button', () => {
    const closeItemHandler = jest.fn();
    const field = 'some new title';

    testRender(<EditListItem item={item} closeItem={closeItemHandler} />, { store });

    const input = screen.getByTestId('edit-input');
    const button = screen.getByTestId('edit-button');

    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(button);
    expect(closeItemHandler).toHaveBeenCalled();
  });
});
