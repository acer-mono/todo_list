import React from 'react';
import { changeCategory } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { ITEM_STATE_FILTER, Store } from '../../redux/reducers/todos';

interface CategorySelectProps {
  filterValues: typeof ITEM_STATE_FILTER;
}

export const CategorySelect = ({ filterValues }: CategorySelectProps) => {
  const currentItemState = useSelector((store: Store) => store.filterParams.category);
  const dispatch = useDispatch();
  return (
    <select
      data-testid="select"
      name="select"
      value={currentItemState}
      onChange={e => {
        dispatch(changeCategory({ category: e.target.value }));
      }}
    >
      {Object.entries(filterValues).map(([key, value]) => (
        <option data-testid="category-option" key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};
