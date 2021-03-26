import React, { useEffect } from 'react';
import './Alert.css';

type AlertProps = {
  messages: string[];
  delay: number;
  onClose: () => void;
};

export const Alert = ({ messages, delay, onClose }: AlertProps) => {
  useEffect(() => {
    let timer = setTimeout(() => {
      onClose();
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [messages]);

  if (messages.length) {
    return (
      <div className="alert" data-testid="alert">
        <button onClick={onClose} data-testid="alert-close">
          Close
        </button>
        {messages.map((error, index) => (
          <div key={index} data-testid="error">
            {error}
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};
