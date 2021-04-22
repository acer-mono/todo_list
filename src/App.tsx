import React from 'react';
import './views/Todos.css';
import { Todos } from './views/Todos';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner/Spinner';
import { REQUEST_STATUS } from './redux/actions';
import { Alert } from './components/Alert/Alert';
import { Store } from './redux/store';

function App() {
  const isLoading = useSelector((store: Store) => store.todo.requestStatus);
  return (
    <>
      <Todos />
      <Alert delay={3000} />
      {isLoading === REQUEST_STATUS.LOADING && <Spinner />}
    </>
  );
}

export default App;
