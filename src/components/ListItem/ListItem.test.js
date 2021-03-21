import { ListItem } from './ListItem';
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { ACTION_TYPES, initialState } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

describe('ListItemTests', () => {
  test('pass value', () => {
    const value = { id: '0', name: 'hello', isDone: false, position: 10 };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });
    const linkElement = screen.getByText(value.name);
    expect(linkElement).toBeInTheDocument();
  });

  test('click Edit button', () => {
    const value = { id: '0', name: 'hello', isDone: false, position: 10 };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });
    fireEvent.click(screen.getByTestId('edit-cancel-button'));
    expect(screen.getByTestId('editForm')).toBeInTheDocument();
  });

  test('remove item', () => {
    const value = { id: '0', name: 'hello', isDone: false, position: 10 };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });

    const element = screen.getByTestId('remove-button');
    fireEvent.click(element);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.REMOVE,
      payload: { id: value.id }
    });
  });

  test('change position item', () => {
    const value = { id: '0', name: 'hello', isDone: false, position: 10 };
    const store = makeTestStore({ initialState: { ...initialState, list: [value] } });

    testRender(<ListItem isFirst={false} isLast={false} item={value} />, { store });

    const linkElement = screen.getByText(/hello/i);
    expect(linkElement).toBeInTheDocument();
    //Up case
    const elementUp = screen.getByTestId('up');
    fireEvent.click(elementUp);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.CHANGE_POSITION,
      payload: {
        id: value.id,
        number: 1
      }
    });
    //Down case
    const elementDown = screen.getByTestId('down');
    fireEvent.click(elementDown);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.CHANGE_POSITION,
      payload: {
        id: value.id,
        number: -1
      }
    });
  });

  test('done item show checked checkbox', () => {
    const value = { id: '0', name: 'hello', isDone: true, position: 10 };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });

    const checkBox = screen.getByTestId('item-checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toHaveAttribute('checked');
  });

  test('item in progress show unchecked checkbox', () => {
    const value = { id: '0', name: 'hello', isDone: false, position: 10 };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });

    const checkBox = screen.getByTestId('item-checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toHaveAttribute('checked');
  });

  test('click on checkbox triggers event handler with correct arguments', () => {
    const value = { id: '0', name: 'hello', isDone: false, position: 10 };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });

    const checkBox = screen.getByTestId('item-checkbox');

    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(checkBox);
    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.CHANGE_STATE,
      payload: {
        id: value.id,
        isDone: !value.isDone
      }
    });
  });
});
