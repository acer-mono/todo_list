import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addError, create } from '../../redux/actions';

enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

const url = 'http://localhost:3001/todos';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState(0);
  const [requestState, setRequestState] = useState(REQUEST_STATUS.IDLE);
  const dispatch = useDispatch();

  const createListItem = async () => {
    setRequestState(REQUEST_STATUS.LOADING);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: name,
        position: position
      })
    });

    const data = await response.json();

    if (!response.ok) {
      dispatch(addError({ error: data.error }));
      setRequestState(REQUEST_STATUS.ERROR);
    } else {
      dispatch(create({ item: data }));
      setRequestState(REQUEST_STATUS.SUCCESS);
      setPosition(position => position + 1);
      setName('');
    }
  };
  return (
    <>
      {requestState === REQUEST_STATUS.LOADING && 'Loading'}
      <input
        data-testid="create-input"
        type="text"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <button data-testid="create-button" onClick={() => createListItem()}>
        Добавить
      </button>
    </>
  );
};
