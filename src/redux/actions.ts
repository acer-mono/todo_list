import {
  ACTION_TYPES,
  ActionCategoryChanged,
  ActionChangePosition,
  ActionChangeState,
  ActionCreate,
  ActionEdit,
  ActionFilterChanged,
  ActionRemove
} from './actionTypes';
import { Item } from './reducers/todos';

export const create = (payload: { item: Item }): ActionCreate => ({
  type: ACTION_TYPES.CREATE,
  payload
});

export const changeFilter = (payload: { searchString: string }): ActionFilterChanged => ({
  type: ACTION_TYPES.FILTER_CHANGED,
  payload
});

export const changeCategory = (payload: { category: string }): ActionCategoryChanged => ({
  type: ACTION_TYPES.CATEGORY_CHANGED,
  payload
});

export const remove = (payload: { id: string }): ActionRemove => ({
  type: ACTION_TYPES.REMOVE,
  payload
});

export const changePosition = (payload: { id: string; number: number }): ActionChangePosition => ({
  type: ACTION_TYPES.CHANGE_POSITION,
  payload
});

export const changeState = (payload: { id: string; isDone: boolean }): ActionChangeState => ({
  type: ACTION_TYPES.CHANGE_STATE,
  payload
});

export const edit = (payload: { id: string; name: string }): ActionEdit => ({
  type: ACTION_TYPES.EDIT,
  payload
});
