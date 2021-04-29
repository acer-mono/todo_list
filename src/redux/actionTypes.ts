import { Item } from './reducers/todos';
import { REQUEST_STATUS } from './actions';
import { ITEM_STATE_FILTER_TYPE } from './reducers/filter';

export const ACTION_TYPES = {
  REMOVE: 'remove',
  EDIT: 'edit',
  CREATE: 'create',
  FILTER_CHANGED: 'filterChanged',
  CATEGORY_CHANGED: 'categoryChanged',
  CLEAR_ERRORS: 'clearErrors',
  ADD_ERROR: 'addError',
  LOAD_MESSAGES: 'loadMessages',
  SET_REQUEST_STATUS: 'setRequestStatus',
  SET_AUTH_STATUS: 'setAuthStatus',
  INITIAL_AUTH: 'initialAuth'
} as const;

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
  | ActionSetAuthStatus
  | ActionInitialAuth;

export type ActionInitialAuth = {
  type: typeof ACTION_TYPES.INITIAL_AUTH;
};

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
