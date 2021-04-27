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
  const isAuth = useSelector((store: Store) => store.auth.state);
  return (
    <>
      <Switch>
        {isAuth && <Route path="/" component={Todos} />}
        {!isAuth && <Route path="/" component={Login} />}
      </Switch>
      <Alert delay={3000} />
      {isLoading === REQUEST_STATUS.LOADING && <Spinner />}
    </>
  );
}

export default App;
