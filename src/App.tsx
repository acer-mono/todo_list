import React, { useEffect } from 'react';
import './views/Todos/Todos.css';
import { Todos } from './views/Todos/Todos';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './components/Spinner/Spinner';
import { initialAuthCheck, REQUEST_STATUS } from './redux/actions';
import { Alert } from './components/Alert/Alert';
import { Store } from './redux';
import { Route, Switch } from 'react-router';
import { Login } from './components/Login/Login';
import { AUTH_STATE } from './redux/reducers/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialAuthCheck());
  }, []);

  const isLoading = useSelector((store: Store) => store.todo.requestStatus);
  const authState = useSelector((store: Store) => store.auth.state);
  return (
    <>
      <Switch>
        {authState === AUTH_STATE.SUCCESS && <Route path="/" component={Todos} />}
        {authState === AUTH_STATE.FAILURE && <Route path="/" component={Login} />}
      </Switch>
      <Alert delay={3000} />
      {isLoading === REQUEST_STATUS.LOADING && <Spinner />}
    </>
  );
}

export default App;
