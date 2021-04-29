import { ACTION_TYPES } from '../actionTypes';
import { takeEvery, call, put, fork } from 'redux-saga/effects';
import api from '../../components/api';
import {
  addError,
  loadMessages,
  REQUEST_STATUS,
  setAuthStatus,
  setRequestStatus
} from '../actions';

export default function* rootSaga() {
  yield takeEvery(ACTION_TYPES.INITIAL_AUTH, initialAuthSaga);
}

export function* initialAuthSaga() {
  try {
    yield put(setRequestStatus(REQUEST_STATUS.LOADING));
    yield call(api.auth.isAuth);
    yield put(setRequestStatus(REQUEST_STATUS.SUCCESS));
    yield put(setAuthStatus(true));
    yield fork(getElementsSaga);
  } catch (e) {
    yield put(setRequestStatus(REQUEST_STATUS.ERROR));
    yield put(setAuthStatus(false));
    yield put(addError({ error: e.message }));
  }
}

export function* getElementsSaga() {
  try {
    yield put(setRequestStatus(REQUEST_STATUS.LOADING));
    // @ts-ignore
    const data = yield call(api.todos.list);
    yield put(setRequestStatus(REQUEST_STATUS.SUCCESS));
    yield put(loadMessages({ list: data }));
  } catch (e) {
    yield put(setRequestStatus(REQUEST_STATUS.ERROR));
    yield put(addError({ error: e.message }));
  }
}
