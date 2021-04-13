import { List } from './List';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { initialState } from '../../redux/reducers/todos';
import { makeTestStore, testRender } from '../../setupTests';
import { REQUEST_STATUS } from '../../redux/actions';

describe('List tests', () => {
  test('pass two items', () => {
    const list = [
      { id: 0, title: 'hello', isChecked: false },
      { id: 1, title: 'hello', isChecked: false }
    ];
    const store = makeTestStore({ initialState: { ...initialState, list }, useMockStore: true });
    testRender(<List />, { store });
    const elements = screen.getAllByTestId('list-item');
    expect(elements).toHaveLength(list.length);
  });

  test('pass empty list', () => {
    const store = makeTestStore({ initialState, useMockStore: true });
    testRender(<List />, { store });
    const elements = screen.queryAllByTestId('list-item');
    expect(elements).toHaveLength([].length);
  });

  test('remove all items', () => {
    const list = [
      { id: 0, title: 'hello', isChecked: false },
      { id: 1, title: 'hello', isChecked: false }
    ];
    const store = makeTestStore({ initialState: { ...initialState, list }, useMockStore: true });
    testRender(<List />, { store });
    const elements = screen.getAllByTestId('remove-button');
    elements.forEach(el => {
      fireEvent.click(el);
      expect(store.getActions()[0]).toEqual({
        type: ACTION_TYPES.SET_REQUEST_STATUS,
        payload: { requestStatus: REQUEST_STATUS.LOADING }
      });
    });
  });

  test('click on checkbox of every item', () => {
    const list = [
      { id: 0, title: 'hello', isChecked: false },
      { id: 1, title: 'hello', isChecked: true }
    ];
    const store = makeTestStore({ initialState: { ...initialState, list }, useMockStore: true });
    testRender(<List />, { store });
    const elements = screen.getAllByTestId('item-checkbox');
    elements.forEach(el => {
      //click on checkbox
      fireEvent.click(el);
      expect(store.getActions()[0]).toEqual({
        type: ACTION_TYPES.SET_REQUEST_STATUS,
        payload: { requestStatus: REQUEST_STATUS.LOADING }
      });
    });
  });
});
