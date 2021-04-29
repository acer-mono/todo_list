import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';
import rootSaga from './sagas';
import { todoInitialState, TodoSlice } from './reducers/todos';
import { filterInitialState, FilterSlice } from './reducers/filter';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { authInitialState, AuthSlice } from './reducers/auth';

export const history = createBrowserHistory();

export type Store = {
  todo: TodoSlice;
  filter: FilterSlice;
  auth: AuthSlice;
};

export const initialState: Store = {
  todo: todoInitialState,
  filter: filterInitialState,
  auth: authInitialState
};

export const rootReducer = createRootReducer(history);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, routerMiddleware(history), sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
export type AppDispatch = typeof store.dispatch;
export default store;
