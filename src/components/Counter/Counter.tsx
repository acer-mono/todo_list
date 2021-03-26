import React from 'react';
import { Item } from '../../redux/reducers/todos';
type CounterType = {
  items: Item[];
};

export const Counter = ({ items }: CounterType) => {
  return (
    <div>
      <div>
        <span>All: </span>
        <span data-testid="counter-all">{items.length}</span>
      </div>
      <div>
        <span>Done: </span>
        <span data-testid="counter-done">{items.filter(el => el.isDone).length}</span>
      </div>
      <div>
        <span>Not done: </span>
        <span data-testid="counter-not-done">{items.filter(el => !el.isDone).length}</span>
      </div>
    </div>
  );
};
