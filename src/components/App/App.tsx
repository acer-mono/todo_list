import React, { useState, Suspense, useEffect } from 'react';
import './App.css';
import { List } from '../List/List';
import { SearchPanel, FilterArguments } from '../SearchPanel/SearchPanel';
import { selectListByFilter, reducer, StoreType, InitialStore } from '../../store';
import { CreateForm } from '../CreateForm/CreateForm';
import { CategorySelect } from '../CategorySelect/CategorySelect';
import { Action, FILTER_VALUES } from '../../store';
import { AuthCheck, useUser } from 'reactfire';
import LogInForm from '../../LoginForm';
import firebase from 'firebase';
import 'firebase/auth';

function App() {
  const [store, setStore] = useState<StoreType>(InitialStore);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(FILTER_VALUES[0]);
  const db = firebase.database();
  const [user, setUser] = useState(useUser().data);

  useEffect(() => {
    const unregisterAuthObserver = firebase.auth().onAuthStateChanged(newUser =>
      setUser(() => {
        if (newUser) {
          db.ref(`stores/${newUser.uid}`).on('value', snapshot => {
            const value = snapshot.val()?.store;
            if (!value?.list) {
              setStore(InitialStore);
            } else {
              setStore(value);
            }
          });
          return newUser;
        }
        return user;
      })
    );
    return () => unregisterAuthObserver();
  }, []);

  function dispatch(action: Action) {
    if (user) {
      const newState = reducer(action, store);
      db.ref(`stores/${user.uid}`).set({
        store: newState
      });
    }
  }

  function updateState(action: FilterArguments) {
    switch (action.name) {
      case 'updateSearch':
        setSearch(action.value);
        break;
      case 'updateCategory':
        setCategory(action.value);
        break;
    }
  }

  return (
    <Suspense fallback="Loading...">
      <AuthCheck fallback={<LogInForm />}>
        <div className="wrapper">
          <div>
            <h1>Список дел</h1>
            <h2>Лабораторная №2. Добавляем элемент в список</h2>
          </div>
          <div>
            <CreateForm dispatch={dispatch} />
            <CategorySelect filterValues={FILTER_VALUES} updateCategory={updateState} />
            <br />
            <SearchPanel filter={updateState} />
            <br />
            <List
              list={selectListByFilter({
                list: store.list,
                filterParams: { category, searchString: search }
              })}
              dispatch={dispatch}
            />
          </div>
        </div>
      </AuthCheck>
    </Suspense>
  );
}

export default App;
