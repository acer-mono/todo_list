import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import { CategorySelect } from './CategorySelect';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES } from '../../store';

const values = ['FIRST', 'SECOND'];

describe('CategorySelect tests', () => {
  test('pass option object with two elements', () => {
    const store = makeTestStore();

    testRender(<CategorySelect filterValues={values} />, { store });

    const elements = screen.getAllByTestId('category-option');
    expect(elements).toHaveLength(values.length);
    for (let i = 0; i < elements.length; i++) {
      expect(elements[i]).toHaveTextContent(values[i]);
    }
  });

  test('pass empty option object', () => {
    const store = makeTestStore();

    testRender(<CategorySelect filterValues={[]} />, { store });

    const elements = screen.queryAllByTestId('category-option');

    expect(elements).toHaveLength(0);
  });

  test('change option', () => {
    const value = values[1];
    const store = makeTestStore();

    testRender(<CategorySelect filterValues={values} />, { store });

    fireEvent.change(screen.getByTestId('select'), { target: { value: value } });
    const options = screen.queryAllByTestId('category-option');

    expect(options[0].selected).toBeFalsy();
    expect(options[1].selected).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.CATEGORY_CHANGED,
      payload: {
        category: value
      }
    });
  });
});
