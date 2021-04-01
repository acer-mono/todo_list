import React from 'react';
import { ITEM_STATE_FILTER } from '../../redux/reducers/todos';
import { useSelector } from 'react-redux';
import { selectItemsCount } from '../../redux/selectors';

export const Counter = () => {
  const items = useSelector(selectItemsCount);
  return (
    <div>
      <div>
        <span>All: </span>
        <span data-testid="counter-all">{items[ITEM_STATE_FILTER.ALL]}</span>
      </div>
      <div>
        <span>Done: </span>
        <span data-testid="counter-done">{items[ITEM_STATE_FILTER.DONE]}</span>
      </div>
      <div>
        <span>Not done: </span>
        <span data-testid="counter-not-done">{items[ITEM_STATE_FILTER.NOT_DONE]}</span>
      </div>
    </div>
  );
};
