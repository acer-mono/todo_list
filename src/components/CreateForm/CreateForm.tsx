import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addError, create } from '../../redux/actions';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState(0);
  const dispatch = useDispatch();

  const url = 'http://localhost:3001/todos';

  const createListItem = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        position: position
      })
    });
    await response
      .json()
      .then(data => {
        if (data.error) {
          dispatch(addError({ error: data.error }));
          return;
        }
        dispatch(create({ item: data }));
        setPosition(position => position + 1);
        setName('');
      })
      .catch(error => dispatch(addError({ error: error.error })));
  };
  return (
    <>
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
