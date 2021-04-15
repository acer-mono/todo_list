import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { editElement } from '../../redux/actions';
import './EditListItem.css';
import { CgClose } from 'react-icons/all';

interface EditListItemFormProps {
  item: Item;
  closeItem: () => void;
}

export const EditListItem = ({ item, closeItem }: EditListItemFormProps) => {
  const [name, setName] = useState(item.title);
  const dispatch = useDispatch();
  const button = useRef(null);

  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name !== '') {
      dispatch(editElement(item));
    }
    closeItem();
  }

  function blurHandler(e: React.FocusEvent<HTMLInputElement>) {
    if (e.relatedTarget === button.current && name !== '') {
      dispatch(
        editElement({
          id: item.id,
          title: name,
          isChecked: undefined
        })
      );
    }
    closeItem();
  }

  return (
    <div>
      <form
        className="edit-list-item-form"
        data-testid="editForm"
        action=""
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitHandler(e)}
      >
        <input
          className="edit-list-item-input"
          data-testid="edit-input"
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
          onBlur={e => blurHandler(e)}
        />
        <button
          className="edit-list-item-button"
          data-testid="edit-button"
          ref={button}
          onClick={closeItem}
        >
          <CgClose />
        </button>
      </form>
    </div>
  );
};
