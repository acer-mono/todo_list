import React from 'react';
import { Alert } from './Alert';
import { render, screen } from '@testing-library/react';

describe('Alert tests', () => {
  test('Alert is shown', () => {
    render(<Alert isShown={true} messages={['1']} />);
    const component = screen.getByTestId('alert');
    expect(component).toBeInTheDocument();
  });

  test('Alert is not shown', () => {
    render(<Alert isShown={false} />);
    const component = screen.queryByTestId('alert');
    expect(component).toBeNull();
  });

  test('Alert shows all errors', () => {
    const messages = ['one', 'two', 't'];
    render(<Alert isShown={true} messages={messages} />);
    let components = screen.getAllByTestId('error');
    expect(components).toHaveLength(messages.length);
  });

  test('Alert with empty messages is not shown', () => {
    render(<Alert isShown={true} messages={[]} />);
    const component = screen.queryByTestId('alert');
    expect(component).toBeNull();
  });
});
