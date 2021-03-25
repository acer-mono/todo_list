import { Item } from './reducers/todos';

export enum ACTION_TYPES {
  REMOVE,
  CHANGE_POSITION,
  CHANGE_STATE,
  EDIT,
  CREATE,
  FILTER_CHANGED,
  CATEGORY_CHANGED,
  CLEAR_ERRORS,
  ADD_ERROR
}

export type Action =
  | ActionRemove
  | ActionChangePosition
  | ActionChangeState
  | ActionEdit
  | ActionCreate
  | ActionFilterChanged
  | ActionCategoryChanged
  | ActionClearErrors
  | ActionAddError;

export type ActionClearErrors = {
  type: typeof ACTION_TYPES.CLEAR_ERRORS;
  payload: {};
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
    category: string;
  };
};

export type ActionRemove = {
  type: typeof ACTION_TYPES.REMOVE;
  payload: {
    id: string;
  };
};

export type ActionChangePosition = {
  type: typeof ACTION_TYPES.CHANGE_POSITION;
  payload: {
    id: string;
    number: number;
  };
};

export type ActionChangeState = {
  type: typeof ACTION_TYPES.CHANGE_STATE;
  payload: {
    id: string;
    isDone: boolean;
  };
};

export type ActionEdit = {
  type: typeof ACTION_TYPES.EDIT;
  payload: {
    id: string;
    name: string;
  };
};

export type ActionCreate = {
  type: typeof ACTION_TYPES.CREATE;
  payload: {
    item: Item;
  };
};
