import React, { useEffect } from 'react';
import './Alert.css';
import { CgClose } from 'react-icons/all';

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
      <div data-testid="alert">
        {messages.map((error, index) => (
          <div key={index} className="alert">
            <button className="close" onClick={onClose} data-testid="alert-close">
              <CgClose />
            </button>
            <div data-testid="error">{error}</div>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
};
