import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, REQUEST_STATUS, setRequestStatus } from '../../redux/actions';
import './CreateForm.css';
import { Store } from '../../redux';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const requestState = useSelector((state: Store) => state.todo.requestStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (requestState == REQUEST_STATUS.SUCCESS) {
      setName('');
      dispatch(setRequestStatus(REQUEST_STATUS.IDLE));
    }
  }, [requestState]);

  const createListItem = async () => {
    dispatch(addElement(name));
  };

  return (
    <>
      <form data-testid="create-form" action="#" onSubmit={createListItem}>
        <input
          className="create-field"
          data-testid="create-input"
          type="text"
          value={name}
          disabled={requestState == REQUEST_STATUS.LOADING}
          placeholder="Type here to add"
          onChange={event => setName(event.target.value)}
        />
      </form>
    </>
  );
};
