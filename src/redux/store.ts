import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { todoInitialState, TodoSlice } from './reducers/todos';
import { filterInitialState, FilterSlice } from './reducers/filter';

export type Store = {
  todo: TodoSlice;
  filter: FilterSlice;
};

export const initialState: Store = {
  todo: todoInitialState,
  filter: filterInitialState
};

export { rootReducer };
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof store.dispatch;
export default store;
