import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { EditListItem } from './EditListItemForm';
import { ACTION_TYPES } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

const item = {
  id: '123',
  name: 'first'
};

describe('EditListItemForm tests', () => {
  test('form contains input with passed value and button', () => {
    const store = makeTestStore();

    testRender(<EditListItem item={item} />, { store });
    const form = screen.getByTestId('editForm');
    const input = screen.getByTestId('edit-input');
    const button = screen.getByTestId('edit-button');

    expect(form).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(item.name);
    expect(button).toBeInTheDocument();
  });

  test('submit form with valid name', () => {
    const closeItemHandler = jest.fn();
    const field = 'some new name';
    const store = makeTestStore();

    testRender(<EditListItem item={item} closeItem={closeItemHandler} />, { store });
    const form = screen.getByTestId('editForm');
    const input = screen.getByTestId('edit-input');

    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.submit(form);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.EDIT,
      payload: { id: item.id, name: field }
    });
    expect(closeItemHandler).toHaveBeenCalled();
  });

  test('submit form with empty name', () => {
    const closeItemHandler = jest.fn();
    const field = '';
    const store = makeTestStore();

    testRender(<EditListItem item={item} closeItem={closeItemHandler} />, { store });
    const form = screen.getByTestId('editForm');
    const input = screen.getByTestId('edit-input');

    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.submit(form);
    expect(store.dispatch).not.toBeCalled();
    expect(closeItemHandler).toHaveBeenCalled();
  });

  test('click on submit button', () => {
    const closeItemHandler = jest.fn();
    const field = 'some new name';
    const store = makeTestStore();

    testRender(<EditListItem item={item} closeItem={closeItemHandler} />, { store });

    const input = screen.getByTestId('edit-input');
    const button = screen.getByTestId('edit-button');

    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(button);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.EDIT,
      payload: { id: item.id, name: field }
    });
    expect(closeItemHandler).toHaveBeenCalled();
  });

  test('focusOut from input', () => {
    const closeItemHandler = jest.fn();
    const field = 'some new name';
    const store = makeTestStore();

    testRender(<EditListItem item={item} closeItem={closeItemHandler} />, { store });

    const input = screen.getByTestId('edit-input');
    fireEvent.input(input, { target: { value: field } });

    expect(store.dispatch).not.toBeCalled();
    fireEvent.focusIn(input);
    fireEvent.focusOut(input);
    expect(store.dispatch).not.toBeCalled();
    expect(closeItemHandler).toHaveBeenCalled();
  });
});
