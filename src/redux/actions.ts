import {
  ACTION_TYPES,
  ActionAddError,
  ActionCategoryChanged,
  ActionChangePosition,
  ActionChangeRequestStatus,
  ActionChangeState,
  ActionClearErrors,
  ActionCreate,
  ActionEdit,
  ActionFilterChanged,
  ActionLoadMessages,
  ActionRemove
} from './actionTypes';
import { Item } from './reducers/todos';
import { AppDispatch } from './store';

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

export const clearErrors = (payload: {}): ActionClearErrors => ({
  type: ACTION_TYPES.CLEAR_ERRORS,
  payload
});

export const addError = (payload: { error: string }): ActionAddError => ({
  type: ACTION_TYPES.ADD_ERROR,
  payload
});

export const loadMessages = (payload: { list: Item[] }): ActionLoadMessages => ({
  type: ACTION_TYPES.LOAD_MESSAGES,
  payload
});

export const setRequestStatus = (status: REQUEST_STATUS): ActionChangeRequestStatus => ({
  type: ACTION_TYPES.SET_REQUEST_STATUS,
  payload: {
    requestStatus: status
  }
});

export enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

const url = 'http://localhost:3001/todos';

export const addElement = (title: string) => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      position: 1
    })
  });

  const data = await response.json();

  if (!response.ok) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: data.error }));
  } else {
    dispatch(create({ item: data }));
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  }
};

export const getElements = () => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: data.error }));
  } else {
    dispatch(loadMessages({ list: data }));
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  }
};
