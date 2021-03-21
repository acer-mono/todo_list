import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ACTION_TYPES } from '../../store';

export const SearchPanel = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      action=""
      onSubmit={e => {
        e.preventDefault();
        dispatch({
          type: ACTION_TYPES.FILTER_CHANGED,
          payload: {
            searchString: search
          }
        });
      }}
    >
      <input
        data-testid="search-input"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button data-testid="search-button" type="submit">
        Search
      </button>
    </form>
  );
};
