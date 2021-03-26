import React from 'react';
import { Item } from '../../redux/reducers/todos';
type CounterType = {
  items: Item[];
};

export const Counter = ({ items }: CounterType) => {
  return (
    <div>
      <span>Всего:</span>
      <div data-testid="counter-all">{items.length}</div>
      <span>Выполнено:</span>
      <div data-testid="counter-done">{items.filter(el => el.isDone).length}</div>
      <span>В процессе:</span>
      <div data-testid="counter-not-done">{items.filter(el => !el.isDone).length}</div>
    </div>
  );
};
