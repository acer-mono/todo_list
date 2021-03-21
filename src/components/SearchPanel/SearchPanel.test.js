import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { SearchPanel } from './SearchPanel';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../redux/actionTypes';

describe('SearchPanel tests', () => {
  test('search items', () => {
    const store = makeTestStore();
    testRender(<SearchPanel />, { store });
    const field = 'some text';
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    fireEvent.input(input, { target: { value: field } });
    expect(store.dispatch).not.toBeCalled();
    fireEvent.click(button);

    expect(store.dispatch).toBeCalledWith({
      type: ACTION_TYPES.FILTER_CHANGED,
      payload: {
        searchString: field
      }
    });
  });
});
