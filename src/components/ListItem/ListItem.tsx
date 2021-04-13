import React, { useState } from 'react';
import { EditListItem } from '../EditListItemForm/EditListItemForm';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { editElement, removeElement } from '../../redux/actions';

interface ListItemProps {
  item: Item;
}

export const ListItem = ({ item }: ListItemProps) => {
  const isDone = { textDecoration: 'line-through' };
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {!isEdit && (
        <li data-testid="list-item" style={item.isChecked ? isDone : {}}>
          {item.title}
        </li>
      )}
      {isEdit && <EditListItem item={item} closeItem={() => setIsEdit(false)} />}
      <input
        data-testid="item-checkbox"
        type="checkbox"
        checked={item.isChecked}
        onChange={() =>
          dispatch(
            editElement({
              id: item.id,
              isChecked: !item.isChecked,
              title: undefined
            })
          )
        }
      />
      <button data-testid="remove-button" onClick={() => dispatch(removeElement(item.id))}>
        Remove
      </button>
      <button data-testid="edit-cancel-button" onClick={() => setIsEdit(!isEdit)}>
        {!isEdit ? 'Edit' : 'Cancel'}
      </button>
    </>
  );
};
