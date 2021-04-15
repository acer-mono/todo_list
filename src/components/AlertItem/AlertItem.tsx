import { Error } from '../../redux/reducers/todos';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import { clearErrors } from '../../redux/actions';
import { FaWindowClose } from 'react-icons/fa';
import './AlertItem.css';

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
        <FaWindowClose />
      </button>
      <div data-testid="error">{error.title}</div>
    </div>
  );
};
