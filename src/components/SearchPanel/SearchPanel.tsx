import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory, changeFilter } from '../../redux/actions';
import { ITEM_STATE_FILTER, Store } from '../../redux/reducers/todos';
import { selectItemsCount } from '../../redux/selectors';
import './SearchPanel.css';

interface SearchPanelType {
  filterValues: typeof ITEM_STATE_FILTER;
}

export const SearchPanel = ({ filterValues }: SearchPanelType) => {
  const [search, setSearch] = useState('');
  const items = useSelector(selectItemsCount);
  const currentItemState = useSelector((store: Store) => store.filterParams.category);
  const dispatch = useDispatch();

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
        value={search}
        onChange={e => {
          dispatch(
            changeFilter({
              searchString: e.target.value
            })
          );
          setSearch(e.target.value);
        }}
      />

      {Object.entries(filterValues).map(([key, value]) => (
        <a
          className={currentItemState === value ? 'selectedOption' : undefined}
          data-testid={'option' + value}
          key={key}
          role="option"
          onClick={() => dispatch(changeCategory({ category: value }))}
        >
          {value}({items[value]})
        </a>
      ))}
    </>
  );
};
