import { Action, ACTION_TYPES } from '../actionTypes';
import { REQUEST_STATUS } from '../actions';

export const ITEM_STATE_FILTER = {
  ALL: 'All',
  DONE: 'Done',
  NOT_DONE: 'Not done'
};

export type ITEM_STATE_FILTER_TYPE =
  | typeof ITEM_STATE_FILTER.ALL
  | typeof ITEM_STATE_FILTER.DONE
  | typeof ITEM_STATE_FILTER.NOT_DONE;

export interface Item {
  id: string;
  isChecked: boolean;
  title: string;
}

export type Store = {
  requestStatus: REQUEST_STATUS;
  errors: string[];
  list: Item[];
  filterParams: {
    category: ITEM_STATE_FILTER_TYPE;
    searchString: string;
  };
};

export const initialState: Store = {
  requestStatus: REQUEST_STATUS.IDLE,
  errors: [],
  list: [],
  filterParams: {
    category: ITEM_STATE_FILTER.ALL,
    searchString: ''
  }
};

export function reducer(previousState: Store = initialState, action: Action): Store {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return {
        ...previousState,
        list: [...previousState.list.filter(el => el.id !== action.payload.id)]
      };
    }

    case ACTION_TYPES.EDIT: {
      return {
        ...previousState,
        list: [
          ...previousState.list.map(item => {
            if (item.id === action.payload.id) {
              if (action.payload.title !== undefined) {
                item.title = action.payload.title;
              }
              if (action.payload.isChecked !== undefined) {
                item.isChecked = action.payload.isChecked;
              }
            }
            return item;
          })
        ]
      };
    }

    case ACTION_TYPES.CREATE: {
      return { ...previousState, list: [...previousState.list, action.payload.item] };
    }

    case ACTION_TYPES.FILTER_CHANGED: {
      previousState.filterParams.searchString = action.payload.searchString;
      return { ...previousState };
    }

    case ACTION_TYPES.CATEGORY_CHANGED: {
      previousState.filterParams.category = action.payload.category;
      return { ...previousState };
    }

    case ACTION_TYPES.CLEAR_ERRORS: {
      return { ...previousState, errors: [] };
    }

    case ACTION_TYPES.ADD_ERROR: {
      return { ...previousState, errors: [...previousState.errors, action.payload.error] };
    }

    case ACTION_TYPES.LOAD_MESSAGES: {
      return { ...previousState, list: action.payload.list };
    }

    case ACTION_TYPES.SET_REQUEST_STATUS: {
      return { ...previousState, requestStatus: action.payload.requestStatus };
    }

    default:
      return previousState;
  }
}
