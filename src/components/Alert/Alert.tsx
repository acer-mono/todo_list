import React, { useEffect } from 'react';
import './Alert.css';
import { CgClose } from 'react-icons/all';
import { Error } from '../../redux/reducers/todos';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from '../../redux/actions';
import { selectErrors } from '../../redux/selectors';

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

type AlertItemProps = {
  error: Error;
  delay: number;
};

export const AlertItem = ({ error, delay }: AlertItemProps) => {
  const dispatch = useDispatch();
  useEffect(() => {
    let timer = setTimeout(() => dispatch(clearErrors({ id: error.id })), delay);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div key={error.id} className="alert">
      <button
        className="close"
        onClick={() => dispatch(clearErrors({ id: error.id }))}
        data-testid="alert-close"
      >
        <CgClose />
      </button>
      <div data-testid="error">{error.title}</div>
    </div>
  );
};
