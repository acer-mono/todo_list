import { CreateForm } from '../components/CreateForm/CreateForm';
import { ITEM_STATE_FILTER } from '../redux/reducers/todos';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import { List } from '../components/List/List';
import React from 'react';
import pin from './pin.png';

export const Todos = () => {
  return (
    <div className="todo-wrapper">
      <img className="pin" src={pin} alt="pin" />
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
