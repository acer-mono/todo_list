import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, REQUEST_STATUS } from '../../redux/actions';
import { Store } from '../../redux/reducers/todos';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const requestState = useSelector((state: Store) => state.requestStatus);
  const dispatch = useDispatch();

  const createListItem = async () => {
    dispatch(addElement(name));
  };

  return (
    <>
      <input
        data-testid="create-input"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button
        data-testid="create-button"
        disabled={requestState === REQUEST_STATUS.LOADING}
        onClick={createListItem}
      >
        Добавить
      </button>
    </>
  );
};
