import { CreateForm } from '../components/CreateForm/CreateForm';
import { ITEM_STATE_FILTER } from '../redux/reducers/todos';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import { List } from '../components/List/List';
import React from 'react';

export const Todos = () => {
  return (
    <div className="wrapper">
      <div>
        <h1>Todo List</h1>
      </div>
      <div>
        <CreateForm />
        <br />
        <SearchPanel filterValues={ITEM_STATE_FILTER} />
        <br />
        <List />
      </div>
    </div>
  );
};
