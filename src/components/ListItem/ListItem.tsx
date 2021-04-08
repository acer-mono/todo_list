import React, { useState } from 'react';
import { EditListItem } from '../EditListItemForm/EditListItemForm';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { editElement, removeElement } from '../../redux/actions';

interface ListItemProps {
  item: Item;
  isFirst: boolean;
  isLast: boolean;
}

export const ListItem = ({ item, isFirst, isLast }: ListItemProps) => {
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
              position: undefined,
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
      {!isFirst && (
        <button
          data-testid="up"
          onClick={() =>
            dispatch(
              editElement({
                id: item.id,
                position: item.position + 1,
                title: undefined,
                isChecked: undefined
              })
            )
          }
        >
          ↑
        </button>
      )}
      {!isLast && (
        <button
          data-testid="down"
          onClick={() =>
            dispatch(
              editElement({
                id: item.id,
                position: item.position - 1,
                title: undefined,
                isChecked: undefined
              })
            )
          }
        >
          ↓
        </button>
      )}
    </>
  );
};
