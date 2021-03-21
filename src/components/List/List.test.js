import { List } from './List';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { ACTION_TYPES, initialState } from '../../store';
import { makeTestStore, testRender } from '../../setupTests';

describe('List tests', () => {
  test('pass two items', () => {
    const list = [
      { id: 0, name: 'hello', isDone: false, position: 10 },
      { id: 1, name: 'hello', isDone: false, position: 11 }
    ];
    const store = makeTestStore({ initialState: { ...initialState, list } });
    testRender(<List />, { store });
    const elements = screen.getAllByTestId('list-item');
    expect(elements).toHaveLength(list.length);
  });

  test('pass empty list', () => {
    const store = makeTestStore();
    testRender(<List />, { store });
    const elements = screen.queryAllByTestId('list-item');
    expect(elements).toHaveLength([].length);
  });

  test('remove all items', () => {
    const list = [
      { id: 0, name: 'hello', isDone: false, position: 10 },
      { id: 1, name: 'hello', isDone: false, position: 11 }
    ];
    const store = makeTestStore({ initialState: { ...initialState, list } });
    testRender(<List />, { store });
    const elements = screen.getAllByTestId('remove-button');
    elements.forEach((el, index) => {
      fireEvent.click(el);
      expect(store.dispatch).toBeCalledWith({
        type: ACTION_TYPES.REMOVE,
        payload: { id: list[index].id }
      });
    });
  });

  test('click on checkbox of every item', () => {
    const list = [
      { id: 0, name: 'hello', isDone: false, position: 10 },
      { id: 1, name: 'hello', isDone: true, position: 11 }
    ];
    const store = makeTestStore({ initialState: { ...initialState, list } });
    testRender(<List />, { store });
    const elements = screen.getAllByTestId('item-checkbox');
    elements.forEach((el, index) => {
      //item show correct state of checkbox
      expect(el.getAttribute('checked')).toEqual(list[index].isDone ? '' : null);
      //click on checkbox
      fireEvent.click(el);
      expect(store.dispatch).toBeCalledWith({
        type: ACTION_TYPES.CHANGE_STATE,
        payload: {
          id: list[index].id,
          isDone: list[index].isDone
        }
      });
    });
  });
});
