import React, { useState, Suspense, useEffect } from 'react';
import './App.css';
import { List } from './components/List/List';
import { SearchPanel } from './components/SearchPanel/SearchPanel';
import { CreateForm } from './components/CreateForm/CreateForm';
import { CategorySelect } from './components/CategorySelect/CategorySelect';
import { FILTER_VALUES } from './redux/selectors';
import { AuthCheck, useUser } from 'reactfire';
import LogInForm from './LoginForm';
import firebase from 'firebase';
import 'firebase/auth';

function App() {
  //const store = useSelector((store: Store) => store);
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
        <div className="wrapper">
          <div>
            <h1>Список дел</h1>
            <h2>Лабораторная №2. Добавляем элемент в список</h2>
          </div>
          <div>
            <CreateForm />
            <CategorySelect filterValues={FILTER_VALUES} />
            <br />
            <SearchPanel />
            <br />
            <List />
          </div>
        </div>
      </AuthCheck>
    </Suspense>
  );
}

export default App;
