import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addError, create } from '../../redux/actions';
import { selectListTitles } from '../../redux/selectors';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState(0);
  const dispatch = useDispatch();
  const todos = useSelector(selectListTitles);

  /*
  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };
  */

  function validate() {
    if (name === '') {
      dispatch(addError({ error: 'Название задачи не может быть пустым' }));
      return false;
    }
    if (todos.includes(name)) {
      dispatch(addError({ error: 'Названия задач не должны повторяться' }));
      return false;
    }
    return true;
  }
  const url = 'http://localhost:3001/todos';

  const createListItem = async () => {
    if (validate()) {
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
      const data = await response.json();
      if (data.error) {
        dispatch(addError({ error: data.error }));
      } else {
        setPosition(position => position + 1);
        setName('');
        dispatch(create({ item: data }));
      }
    }
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
