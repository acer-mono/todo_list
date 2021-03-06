import { ListItem } from './ListItem';
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { REQUEST_STATUS } from '../../redux/actions';

describe('ListItemTests', () => {
  test('pass value', () => {
    const value = { id: '0', title: 'hello', isChecked: false };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });
    const linkElement = screen.getByText(value.title);
    expect(linkElement).toBeInTheDocument();
  });

  test('click Edit button', () => {
    const value = { id: '0', title: 'hello', isChecked: false };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });
    fireEvent.click(screen.getByTestId('edit-cancel-button'));
    expect(screen.getByTestId('editForm')).toBeInTheDocument();
  });

  test('remove item', () => {
    const value = { id: '0', title: 'hello', isChecked: false };
    const store = makeTestStore({ useMockStore: true });

    testRender(<ListItem item={value} />, { store });

    const element = screen.getByTestId('remove-button');
    fireEvent.click(element);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: { requestStatus: REQUEST_STATUS.LOADING }
    });
  });

  test('done item show checked checkbox', () => {
    const value = { id: '0', title: 'hello', isChecked: true };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });

    const checkBox = screen.getByTestId('item-checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).toHaveAttribute('checked');
  });

  test('item in progress show unchecked checkbox', () => {
    const value = { id: '0', title: 'hello', isChecked: false };
    const store = makeTestStore();

    testRender(<ListItem item={value} />, { store });

    const checkBox = screen.getByTestId('item-checkbox');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toHaveAttribute('checked');
  });

  test('click on checkbox triggers event handler with correct arguments', () => {
    const value = { id: '0', title: 'hello', isChecked: false };
    const store = makeTestStore({ useMockStore: true });

    testRender(<ListItem item={value} />, { store });

    const checkBox = screen.getByTestId('item-checkbox');

    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(checkBox);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: { requestStatus: REQUEST_STATUS.LOADING }
    });
  });
});
