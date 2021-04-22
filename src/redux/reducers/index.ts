import { combineReducers } from 'redux';
import { todosReducer } from './todos';
import { filterReducer } from './filter';

const rootReducer = combineReducers({
  todo: todosReducer,
  filter: filterReducer
});

export default rootReducer;
