import React from 'react';
import { Alert } from './Alert';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Alert tests', () => {
  test('Alert is shown', () => {
    render(<Alert messages={['1']} delay={3000} />);
    const component = screen.getByTestId('alert');
    expect(component).toBeInTheDocument();
  });

  test('Alert shows all errors', () => {
    const messages = ['one', 'two', 't'];
    render(<Alert messages={messages} delay={3000} />);
    let components = screen.getAllByTestId('error');
    expect(components).toHaveLength(messages.length);
  });

  test('Alert with empty messages is not shown', () => {
    render(<Alert messages={[]} />);
    const component = screen.queryByTestId('alert');
    expect(component).toBeNull();
  });

  test('onClose is called after delay', () => {
    const onClose = jest.fn();
    jest.useFakeTimers();
    const messages = ['one', 'two', 't'];
    render(<Alert messages={messages} delay={3000} onClose={onClose} />);
    expect(onClose).not.toBeCalled();
    jest.advanceTimersByTime(3000);
    expect(onClose).toBeCalled();
  });

  test('onClose is called after click on button', () => {
    const onClose = jest.fn();
    jest.useFakeTimers();
    const messages = ['one', 'two', 't'];
    render(<Alert messages={messages} delay={3000} onClose={onClose} />);
    let button = screen.getByTestId('alert-close');
    fireEvent.click(button);
    expect(onClose).toBeCalled();
  });
});
