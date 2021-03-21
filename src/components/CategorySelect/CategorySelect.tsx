import React, { useState } from 'react';
import { ACTION_TYPES, IFilterValues } from '../../store';
import { useDispatch } from 'react-redux';

export interface UpdateCategoryArguments {
  name: string;
  value: string;
}

interface CategorySelectProps {
  filterValues: IFilterValues;
}

export const CategorySelect = ({ filterValues }: CategorySelectProps) => {
  const [filter, setFilter] = useState(filterValues[0]);
  const dispatch = useDispatch();
  return (
    <select
      data-testid="select"
      name="select"
      value={filter}
      onChange={e => {
        setFilter(e.target.value);
        dispatch({
          type: ACTION_TYPES.CATEGORY_CHANGED,
          payload: { category: e.target.value }
        });
      }}
    >
      {filterValues.map((filterItem, index) => (
        <option data-testid="category-option" key={index} value={filterItem}>
          {filterItem}
        </option>
      ))}
    </select>
  );
};
