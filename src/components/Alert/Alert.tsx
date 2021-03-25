import React, { useEffect, useState } from 'react';

type AlertProps = {
  isShown: boolean;
  messages: string[];
  delay: number;
  onClose: () => void;
};

export const Alert = ({ isShown, messages, delay, onClose }: AlertProps) => {
  const [visibility, setVisibility] = useState(isShown);

  useEffect(() => {
    let timer = setTimeout(() => {
      onClose();
      setVisibility(false);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (visibility && messages.length) {
    return (
      <div data-testid="alert">
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
