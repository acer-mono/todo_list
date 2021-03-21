import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../../redux/actions';

export const CreateForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState(0);
  const dispatch = useDispatch();

  const uid = function () {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  function validate() {
    return name !== '';
  }

  function createListItem() {
    if (validate()) {
      const newItem = { id: uid(), name, isDone: false, position: position };
      setPosition(position => position + 1);
      setName('');
      dispatch(create({ item: newItem }));
    } else {
      alert('?');
    }
  }
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
