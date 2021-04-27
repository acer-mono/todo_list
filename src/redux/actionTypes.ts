import { Item } from './reducers/todos';
import { REQUEST_STATUS } from './actions';
import { ITEM_STATE_FILTER_TYPE } from './reducers/filter';

export enum ACTION_TYPES {
  REMOVE,
  EDIT,
  CREATE,
  FILTER_CHANGED,
  CATEGORY_CHANGED,
  CLEAR_ERRORS,
  ADD_ERROR,
  LOAD_MESSAGES,
  SET_REQUEST_STATUS,
  SET_AUTH_STATUS
}

export type Action =
  | ActionRemove
  | ActionEdit
  | ActionCreate
  | ActionFilterChanged
  | ActionCategoryChanged
  | ActionClearErrors
  | ActionAddError
  | ActionLoadMessages
  | ActionChangeRequestStatus
  | ActionSetAuthStatus;

export type ActionSetAuthStatus = {
  type: typeof ACTION_TYPES.SET_AUTH_STATUS;
  payload: {
    state: boolean;
  };
};

export type ActionChangeRequestStatus = {
  type: typeof ACTION_TYPES.SET_REQUEST_STATUS;
  payload: { requestStatus: REQUEST_STATUS };
};

export type ActionClearErrors = {
  type: typeof ACTION_TYPES.CLEAR_ERRORS;
  payload: { id: string };
};

export type ActionLoadMessages = {
  type: typeof ACTION_TYPES.LOAD_MESSAGES;
  payload: {
    list: Item[];
  };
};

export type ActionAddError = {
  type: typeof ACTION_TYPES.ADD_ERROR;
  payload: {
    error: string;
  };
};

export type ActionFilterChanged = {
  type: typeof ACTION_TYPES.FILTER_CHANGED;
  payload: {
    searchString: string;
  };
};

export type ActionCategoryChanged = {
  type: typeof ACTION_TYPES.CATEGORY_CHANGED;
  payload: {
    category: ITEM_STATE_FILTER_TYPE;
  };
};

export type ActionRemove = {
  type: typeof ACTION_TYPES.REMOVE;
  payload: {
    id: string;
  };
};

export type ActionEdit = {
  type: typeof ACTION_TYPES.EDIT;
  payload: {
    id: string;
    title: string | undefined;
    isChecked: boolean | undefined;
  };
};

export type ActionCreate = {
  type: typeof ACTION_TYPES.CREATE;
  payload: {
    item: Item;
  };
};
