import React, { useState } from 'react';
import { EditListItem } from '../EditListItemForm/EditListItemForm';
import { useDispatch } from 'react-redux';
import { Item } from '../../redux/reducers/todos';
import { editElement, removeElement } from '../../redux/actions';
import { FaTrash, FaEdit } from 'react-icons/fa';
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
      <div className="item-wrapper">
        <div title={item.title} className="item-container">
          <input
            id={item.id}
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
          <label
            className="label-for-checkbox"
            htmlFor={item.id}
            data-testid="list-item"
            style={item.isChecked ? isDone : {}}
          >
            {item.title}
          </label>
        </div>
        <div>
          <button
            className="button button-remove"
            data-testid="remove-button"
            onClick={() => dispatch(removeElement(item.id))}
          >
            <FaTrash />
          </button>
          <button
            className="button button-edit"
            data-testid="edit-cancel-button"
            onClick={() => setIsEdit(!isEdit)}
          >
            <FaEdit />
          </button>
        </div>
      </div>
      {isEdit && (
        <div className="edit-item-form">
          <EditListItem item={item} closeItem={() => setIsEdit(false)} />
        </div>
      )}
    </>
  );
};
