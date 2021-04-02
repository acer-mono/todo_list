import React, { useEffect } from 'react';
import './App.css';
import { List } from './components/List/List';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { CreateForm } from './components/CreateForm/CreateForm';
import { CategorySelect } from './components/CategorySelect/CategorySelect';
import { selectErrors } from './redux/selectors';
import { Alert } from './components/Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from './redux/actions';
import { Counter } from './components/Counter/Counter';
import { ITEM_STATE_FILTER } from './redux/reducers/todos';

function App() {
  const messages = useSelector(selectErrors);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <>
      <Alert messages={messages} delay={3000} onClose={() => dispatch(clearErrors({}))} />
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
}

export default App;
