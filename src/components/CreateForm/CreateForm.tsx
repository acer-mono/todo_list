import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, REQUEST_STATUS, setRequestStatus } from '../../redux/actions';
import { Store } from '../../redux/reducers/todos';
import './CreateForm.css';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const requestState = useSelector((state: Store) => state.requestStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (requestState == REQUEST_STATUS.SUCCESS) {
      setName('');
      console.log(requestState);
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
