import { useDispatch, useSelector } from 'react-redux';
import { selectErrors } from '../redux/selectors';
import { Alert } from '../components/Alert/Alert';
import { clearErrors } from '../redux/actions';
import { CreateForm } from '../components/CreateForm/CreateForm';
import { CategorySelect } from '../components/CategorySelect/CategorySelect';
import { ITEM_STATE_FILTER } from '../redux/reducers/todos';
import { SearchPanel } from '../components/SearchPanel/SearchPanel';
import { Counter } from '../components/Counter/Counter';
import { List } from '../components/List/List';
import React from 'react';

export const Todos = () => {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();

  return (
    <>
      <Alert messages={errors} delay={3000} onClose={() => dispatch(clearErrors({}))} />
      <div className="wrapper">
        <div>
          <h1>Список дел</h1>
          <h2>Лабораторная №2. Добавляем элемент в список</h2>
        </div>
        <div>
          <CreateForm />
          <CategorySelect filterValues={ITEM_STATE_FILTER} />
          <br />
          <SearchPanel />
          <br />
          <Counter />
          <List />
        </div>
      </div>
    </>
  );
};
