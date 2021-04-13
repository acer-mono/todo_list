import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { SearchPanel } from './SearchPanel';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../redux/actionTypes';
import { initialState, ITEM_STATE_FILTER } from '../../redux/reducers/todos';

describe('SearchPanel tests', () => {
  const idPrefix = 'option';
  let store;

  beforeEach(() => {
    store = makeTestStore();
  });

  test('search items', () => {
    const store = makeTestStore();
    testRender(<SearchPanel filterValues={ITEM_STATE_FILTER} />, { store });
    const field = 'some text';
    const input = screen.getByTestId('search-input');

    expect(input).toBeInTheDocument();
    fireEvent.input(input, { target: { value: field } });

    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.FILTER_CHANGED,
      payload: {
        searchString: field
      }
    });
  });

  test('Counter shows valid info', () => {
    const list = [
      {
        id: '1',
        isChecked: true,
        title: 'Hello',
        position: 0
      },
      {
        id: '2',
        isChecked: false,
        title: 'World',
        position: 1
      }
    ];
    const state = { ...initialState, list };
    const store = makeTestStore({ initialState: state, useMockStore: true });
    testRender(<SearchPanel filterValues={ITEM_STATE_FILTER} />, { store });
    const componentAll = screen.getByTestId(idPrefix + ITEM_STATE_FILTER.ALL);
    const componentDone = screen.getByTestId(idPrefix + ITEM_STATE_FILTER.DONE);
    const componentNotDone = screen.getByTestId(idPrefix + ITEM_STATE_FILTER.NOT_DONE);
    expect(componentAll.textContent).toContain('2');
    expect(componentDone.textContent).toContain('1');
    expect(componentNotDone.textContent).toContain('1');
  });

  test('pass option object with two elements', () => {
    testRender(<SearchPanel filterValues={ITEM_STATE_FILTER} />, { store });

    const elements = screen.getAllByTestId(/option*/i);
    expect(elements).toHaveLength(Object.keys(ITEM_STATE_FILTER).length);
    for (let i = 0; i < elements.length; i++) {
      expect(elements[i]).toHaveTextContent(Object.values(ITEM_STATE_FILTER)[i]);
    }
  });

  test('pass empty option object', () => {
    testRender(<SearchPanel filterValues={{}} />, { store });

    const elements = screen.queryAllByTestId(/option*/i);

    expect(elements).toHaveLength(0);
  });

  test('change option', () => {
    testRender(<SearchPanel filterValues={ITEM_STATE_FILTER} />, { store });

    fireEvent.click(screen.getByTestId(idPrefix + ITEM_STATE_FILTER.DONE));
    const options = screen.queryAllByTestId(/option*/i);

    expect(options[0]).not.toHaveClass('selectedOption');
    expect(options[1]).toHaveClass('selectedOption');
    expect(store.dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.CATEGORY_CHANGED,
      payload: {
        category: ITEM_STATE_FILTER.DONE
      }
    });
  });
});
