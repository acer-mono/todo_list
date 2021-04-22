import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeCategory, changeFilter } from '../../redux/actions';
import { selectItemsCount } from '../../redux/selectors';
import './SearchPanel.css';
import { ITEM_STATE_FILTER } from '../../redux/reducers/filter';
import { Store } from '../../redux/store';

interface SearchPanelType {
  filterValues: typeof ITEM_STATE_FILTER;
}

export const SearchPanel = ({ filterValues }: SearchPanelType) => {
  const [search, setSearch] = useState('');
  const items = useSelector(selectItemsCount);
  const currentItemState = useSelector((store: Store) => store.filter.category);
  const dispatch = useDispatch();

  return (
    <>
      <input
        className="search-field"
        placeholder="Type here to search"
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
      <div className="option-wrapper">
        {Object.entries(filterValues).map(([key, value]) => (
          <a
            className={currentItemState === value ? 'selectedOption option-item' : 'option-item'}
            data-testid={'option' + value}
            key={key}
            role="option"
            onClick={() => dispatch(changeCategory({ category: value }))}
          >
            {value} ({items[value]})
          </a>
        ))}
      </div>
    </>
  );
};
