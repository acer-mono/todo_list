import React from 'react';
import { Counter } from './Counter';
import { render, screen } from '@testing-library/react';

describe('Counter tests', () => {
  const items = [
    {
      id: '1',
      isDone: true,
      name: 'Hello',
      position: 0
    },
    {
      id: '2',
      isDone: false,
      name: 'World',
      position: 1
    }
  ];
  test('Counter shows valid info', () => {
    render(<Counter items={items} />);
    const componentAll = screen.getByTestId('counter-all');
    const componentDone = screen.getByTestId('counter-done');
    const componentNotDone = screen.getByTestId('counter-not-done');
    expect(componentAll.textContent).toEqual('2');
    expect(componentDone.textContent).toEqual('1');
    expect(componentNotDone.textContent).toEqual('1');
  });
});
