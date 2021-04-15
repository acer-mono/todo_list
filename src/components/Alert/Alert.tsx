import React from 'react';
import { useSelector } from 'react-redux';
import { selectErrors } from '../../redux/selectors';
import { AlertItem } from '../AlertItem/AlertItem';

type AlertProps = {
  delay: number;
};

export const Alert = ({ delay }: AlertProps) => {
  const errors = useSelector(selectErrors);

  if (errors.length) {
    return (
      <div data-testid="alert">
        {errors.map(error => (
          <AlertItem error={error} key={error.id} delay={delay} />
        ))}
      </div>
    );
  } else {
    return null;
  }
};
