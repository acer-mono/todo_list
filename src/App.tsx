import React, { useEffect } from 'react';
import './views/Todos.css';
import { Todos } from './views/Todos';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './components/Spinner/Spinner';
import { initialAuthCheck, REQUEST_STATUS } from './redux/actions';
import { Alert } from './components/Alert/Alert';
import { Store } from './redux';
import { Route, Switch } from 'react-router';
import { Login } from './components/Login/Login';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAuthCheck());
  }, []);

  const isLoading = useSelector((store: Store) => store.todo.requestStatus);
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Todos} />
      </Switch>
      <Alert delay={3000} />
      {isLoading === REQUEST_STATUS.LOADING && <Spinner />}
    </>
  );
}

export default App;
