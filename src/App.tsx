import React from 'react';
import './views/Todos.css';
import { Todos } from './views/Todos';
import { useDispatch, useSelector } from 'react-redux';
import { Store } from './redux/reducers/todos';
import Spinner from './components/Spinner/Spinner';
import { clearErrors, REQUEST_STATUS } from './redux/actions';
import { Alert } from './components/Alert/Alert';
import { selectErrors } from './redux/selectors';

function App() {
  const errors = useSelector(selectErrors);
  const dispatch = useDispatch();
  const isLoading = useSelector((store: Store) => store.requestStatus);
  return (
    <>
      <Alert messages={errors} delay={3000} onClose={() => dispatch(clearErrors({}))} />
      <Todos />
      {isLoading === REQUEST_STATUS.LOADING && <Spinner />}
    </>
  );
}

export default App;
