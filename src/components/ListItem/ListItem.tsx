import React, { useState } from 'react';
import { EditListItem } from '../EditListItemForm/EditListItemForm';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { editElement, removeElement } from '../../redux/actions';
import { BsTrash, FaEdit, GiCancel } from 'react-icons/all';
import './ListItem.css';

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
        className="checkbox"
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
      <button
        className="button button-remove"
        data-testid="remove-button"
        onClick={() => dispatch(removeElement(item.id))}
      >
        <BsTrash />
      </button>
      <button
        className="button button-edit"
        data-testid="edit-cancel-button"
        onClick={() => setIsEdit(!isEdit)}
      >
        {!isEdit ? <FaEdit /> : <GiCancel />}
      </button>
    </>
  );
};
