import React, { useState } from 'react';
import { FilterValues } from '../../redux/selectors';
import { changeCategory } from '../../redux/actions';
import { useDispatch } from 'react-redux';

interface CategorySelectProps {
  filterValues: FilterValues;
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
        dispatch(changeCategory({ category: e.target.value }));
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
