import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createRootReducer from './reducers';
import { todoInitialState, TodoSlice } from './reducers/todos';
import { filterInitialState, FilterSlice } from './reducers/filter';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export type Store = {
  todo: TodoSlice;
  filter: FilterSlice;
};

export const initialState: Store = {
  todo: todoInitialState,
  filter: filterInitialState
};

export const rootReducer = createRootReducer(history);

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, routerMiddleware(history)));
export type AppDispatch = typeof store.dispatch;
export default store;
