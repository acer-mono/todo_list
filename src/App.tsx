import React, { useState, Suspense, useEffect } from 'react';
import './App.css';
import { List } from './components/List/List';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { CreateForm } from './components/CreateForm/CreateForm';
import { CategorySelect } from './components/CategorySelect/CategorySelect';
import { selectErrors } from './redux/selectors';
import { AuthCheck, useUser } from 'reactfire';
import LogInForm from './LoginForm';
import firebase from 'firebase';
import 'firebase/auth';
import { Alert } from './components/Alert/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors } from './redux/actions';
import { Counter } from './components/Counter/Counter';
import { ITEM_STATE_FILTER } from './redux/reducers/todos';

function App() {
  const messages = useSelector(selectErrors);
  const dispatch = useDispatch();
  const db = firebase.database();
  const [user, setUser] = useState(useUser().data);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(newUser =>
      setUser(() => {
        if (newUser) {
          db.ref(`stores/${newUser.uid}`).on('value', () => {
            //const value = snapshot.val()?.store;
            /*
            if (!value?.list) {
              setStore(initialState);
            } else {
              setStore(value);
            }
             */
          });
          return newUser;
        }
        return user;
      })
    );
    return () => unregisterAuthObserver();
  }, []);

  return (
    <Suspense fallback="Loading...">
      <AuthCheck fallback={<LogInForm />}>
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
      </AuthCheck>
    </Suspense>
  );
}

export default App;
