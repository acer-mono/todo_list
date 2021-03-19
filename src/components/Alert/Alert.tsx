import React, { useEffect, useState } from 'react';

type AlertProps = {
  isShown: boolean;
  messages: string[];
  delay: number;
};

export const Alert = ({ isShown, messages, delay }: AlertProps) => {
  const [visibility, setVisibility] = useState(isShown);

  useEffect(() => {
    let timer = setTimeout(() => setVisibility(false), delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    visibility &&
    messages.length && (
      <div data-testid="alert">
        {messages.map((error, index) => (
          <div key={index} data-testid="error">
            {error}
          </div>
        ))}
      </div>
    )
  );
};
