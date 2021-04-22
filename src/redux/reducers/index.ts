import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import { filterReducer } from './filter';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

const createRootReducer = (history: History) =>
  combineReducers({
    todo: todosReducer,
    filter: filterReducer,
    router: connectRouter(history)
  });

export default createRootReducer;
