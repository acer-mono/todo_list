import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeFilter } from '../../redux/actions';

export const SearchPanel = () => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  return (
    <form
      action=""
      onSubmit={e => {
        e.preventDefault();
        dispatch(
          changeFilter({
            searchString: search
          })
        );
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
