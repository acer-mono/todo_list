import React, { useState } from 'react';
import { changeCategory } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { ITEM_STATE_FILTER } from '../../redux/reducers/todos';

interface CategorySelectProps {
  filterValues: typeof ITEM_STATE_FILTER;
}

export const CategorySelect = ({ filterValues }: CategorySelectProps) => {
  const [filter, setFilter] = useState(filterValues.ALL);
  const dispatch = useDispatch();
  return (
    <select
      data-testid="select"
      name="select"
      value={filter}
      onChange={e => {
        setFilter(e.target.value);
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
