import React from 'react';
import { Alert } from './Alert';
import { render, screen } from '@testing-library/react';

describe('Alert tests', () => {
  test('Alert is shown', () => {
    render(<Alert isShown={true} messages={['1']} delay={3000} />);
    const component = screen.getByTestId('alert');
    expect(component).toBeInTheDocument();
  });

  test('Alert is not shown', () => {
    render(<Alert isShown={false} messages={[]} delay={3000} />);
    const component = screen.queryByTestId('alert');
    expect(component).toBeNull();
  });

  test('Alert shows all errors', () => {
    const messages = ['one', 'two', 't'];
    render(<Alert isShown={true} messages={messages} delay={3000} />);
    let components = screen.getAllByTestId('error');
    expect(components).toHaveLength(messages.length);
  });

  test('Alert with empty messages is not shown', () => {
    render(<Alert isShown={true} messages={[]} />);
    const component = screen.queryByTestId('alert');
    expect(component).toBeNull();
  });

  test('Alert hidden after 3 seconds', () => {
    jest.useFakeTimers();
    const messages = ['one', 'two', 't'];
    render(<Alert isShown={true} messages={messages} delay={3000} />);
    const component = screen.queryByTestId('alert');
    expect(component).toBeInTheDocument();
    jest.advanceTimersByTime(3000);
    const componentAfterDelay = screen.queryByTestId('alert');
    expect(componentAfterDelay).not.toBeInTheDocument();
  });

  test('onClose is called after delay', () => {
    const onClose = jest.fn();
    jest.useFakeTimers();
    const messages = ['one', 'two', 't'];
    render(<Alert isShown={true} messages={messages} delay={3000} onClose={onClose} />);
    expect(onClose).not.toBeCalled();
    jest.advanceTimersByTime(3000);
    expect(onClose).toBeCalled();
  });
});
