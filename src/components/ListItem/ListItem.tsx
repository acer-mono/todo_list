import React, { useState } from 'react';
import { EditListItem } from '../EditListItemForm/EditListItemForm';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { changePosition, changeState, remove } from '../../redux/actions';

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
            changeState({
              id: item.id,
              isDone: !item.isChecked
            })
          )
        }
      />
      <button data-testid="remove-button" onClick={() => dispatch(remove({ id: item.id }))}>
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
              changePosition({
                id: item.id,
                number: 1
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
              changePosition({
                id: item.id,
                number: -1
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
