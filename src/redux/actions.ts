import {
  ACTION_TYPES,
  ActionAddError,
  ActionCategoryChanged,
  ActionChangeRequestStatus,
  ActionClearErrors,
  ActionCreate,
  ActionEdit,
  ActionFilterChanged,
  ActionLoadMessages,
  ActionLogin,
  ActionLogout,
  ActionRemove
} from './actionTypes';
import { Item } from './reducers/todos';
import { AppDispatch } from '.';
import api from '../components/api';
//import { push } from 'connected-react-router';

export enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

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

export const edit = (payload: {
  id: string;
  title: string | undefined;
  isChecked: boolean | undefined;
}): ActionEdit => ({
  type: ACTION_TYPES.EDIT,
  payload
});

export const clearErrors = (payload: { id: string }): ActionClearErrors => ({
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

export const setLogin = (): ActionLogin => ({
  type: ACTION_TYPES.LOGIN,
  payload: {}
});

export const setLogout = (): ActionLogout => ({
  type: ACTION_TYPES.LOGOUT,
  payload: {}
});

export const addElement = (title: string) => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    const data = await api.todos.add({ title });
    dispatch(create({ item: data }));
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};

export const getElements = () => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    const data = await api.todos.list();
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    dispatch(loadMessages({ list: data }));
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};

export const editElement = (item: {
  id: string;
  isChecked: boolean | undefined;
  title: string | undefined;
}) => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    await api.todos.update(item);
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    dispatch(edit({ ...item }));
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};

export const removeElement = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    await api.todos.delete(id);
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    dispatch(remove({ id: id }));
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};

export const initialAuthCheck = () => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    await api.auth.isAuth();
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    dispatch(setLogin());
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};

export const login = (login: string, password: string) => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    await api.auth.login(login, password);
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    dispatch(setLogin());
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};

export const logout = () => async (dispatch: AppDispatch) => {
  dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
  try {
    await api.auth.logout();
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
    dispatch(setLogout());
  } catch (e) {
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
    dispatch(addError({ error: e.message }));
  }
};
