import React from 'react';
import './views/Todos.css';
import { Todos } from './views/Todos';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner/Spinner';
import { REQUEST_STATUS } from './redux/actions';
import { Alert } from './components/Alert/Alert';
import { Store } from './redux';
import { Route, Switch } from 'react-router';
import { Login } from './components/Login/Login';

function App() {
  const isLoading = useSelector((store: Store) => store.todo.requestStatus);
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Todos />} />
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
      <Alert delay={3000} />
      {isLoading === REQUEST_STATUS.LOADING && <Spinner />}
    </>
  );
}

export default App;
