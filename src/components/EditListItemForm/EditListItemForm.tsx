import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { edit } from '../../redux/actions';

interface EditListItemFormProps {
  item: Item;
  closeItem: () => void;
}

export const EditListItem = ({ item, closeItem }: EditListItemFormProps) => {
  const [name, setName] = useState(item.name);
  const dispatch = useDispatch();
  const button = useRef(null);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name !== '') {
      dispatch(
        edit({
          id: item.id,
          name: name
        })
      );
    }
    closeItem();
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
    if (e.relatedTarget === button.current && name !== '') {
      dispatch(
        edit({
          id: item.id,
          name: name
        })
      );
    }
    closeItem();
  }

  return (
    <div>
      <form
        data-testid="editForm"
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
      >
        <input
          data-testid="edit-input"
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          onBlur={e => blurHandler(e)}
        />
        <button data-testid="edit-button" ref={button} type="submit">
          Save
        </button>
      </form>
    </div>
  );
};
