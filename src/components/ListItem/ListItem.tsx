import React, { useState } from 'react';
import { EditListItem } from '../EditListItemForm/EditListItemForm';
import { ACTION_TYPES, Item } from '../../store';
import { useDispatch } from 'react-redux';

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
        <li data-testid="list-item" style={item.isDone ? isDone : {}}>
          {item.name}
        </li>
      )}
      {isEdit && <EditListItem item={item} closeItem={() => setIsEdit(false)} />}
      <input
        data-testid="item-checkbox"
        type="checkbox"
        checked={item.isDone}
        onChange={() =>
          dispatch({
            type: ACTION_TYPES.CHANGE_STATE,
            payload: {
              id: item.id,
              isDone: !item.isDone
            }
          })
        }
      />
      <button
        data-testid="remove-button"
        onClick={() =>
          dispatch({
            type: ACTION_TYPES.REMOVE,
            payload: {
              id: item.id
            }
          })
        }
      >
        Remove
      </button>
      <button data-testid="edit-cancel-button" onClick={() => setIsEdit(!isEdit)}>
        {!isEdit ? 'Edit' : 'Cancel'}
      </button>
      {!isFirst && (
        <button
          data-testid="up"
          onClick={() =>
            dispatch({
              type: ACTION_TYPES.CHANGE_POSITION,
              payload: {
                id: item.id,
                number: 1
              }
            })
          }
        >
          ↑
        </button>
      )}
      {!isLast && (
        <button
          data-testid="down"
          onClick={() =>
            dispatch({
              type: ACTION_TYPES.CHANGE_POSITION,
              payload: {
                id: item.id,
                number: -1
              }
            })
          }
        >
          ↓
        </button>
      )}
    </>
  );
};
