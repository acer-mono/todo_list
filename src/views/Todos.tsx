import { CreateForm } from '../components/CreateForm/CreateForm';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import { List } from '../components/List/List';
import { ITEM_STATE_FILTER } from '../redux/reducers/filter';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/all';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/actions';

export const Todos = () => {
  const dispatch = useDispatch();
  return (
    <div className="todo-wrapper">
      <button className="button-close" onClick={() => dispatch(logout())}>
        <FaSignOutAlt />
      </button>
      <div className="content-main">
        <div className="header-main">Todo List</div>
        <div className="search-form">
          <SearchPanel filterValues={ITEM_STATE_FILTER} />
        </div>
        <div className="list-items">
          <List />
        </div>
        <div className="create-form">
          <CreateForm />
        </div>
      </div>
    </div>
  );
};
