import React from 'react';
import './views/Todos.css';
import { Todos } from './views/Todos';
import { Login } from './components/Login/Login';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <>
      <Switch>
        <Route path="/home" component={Todos} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/home" />
      </Switch>
    </>
  );
}

export default App;
