import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import { filterReducer } from './filter';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { authReducer } from './auth';

const createRootReducer = (history: History) =>
  combineReducers({
    todo: todosReducer,
    filter: filterReducer,
    auth: authReducer,
    router: connectRouter(history)
  });

export default createRootReducer;
