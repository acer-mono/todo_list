import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { editElement } from '../../redux/actions';
import './EditListItem.css';
import { FaWindowClose } from 'react-icons/fa';

interface EditListItemFormProps {
  item: Item;
  closeItem: () => void;
}

export const EditListItem = ({ item, closeItem }: EditListItemFormProps) => {
  const [name, setName] = useState(item.title);
  const dispatch = useDispatch();
  function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name !== '') {
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
    <div className="edit-list-item-background">
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
        />
        <button
          type="button"
          className="edit-list-item-button"
          data-testid="edit-button"
          onClick={closeItem}
        >
          <FaWindowClose />
        </button>
      </form>
    </div>
  );
};
