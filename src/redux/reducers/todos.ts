import { Action, ACTION_TYPES } from '../actionTypes';
import { REQUEST_STATUS } from '../actions';
import { nanoid } from 'nanoid';

export interface Item {
  id: string;
  isChecked: boolean;
  title: string;
}

export interface Error {
  id: string;
  title: string;
}

export type TodoSlice = {
  list: Item[];
  requestStatus: REQUEST_STATUS;
  errors: Error[];
};

export const todoInitialState: TodoSlice = {
  list: [],
  requestStatus: REQUEST_STATUS.IDLE,
  errors: []
};

export function todosReducer(state: TodoSlice = todoInitialState, action: Action): TodoSlice {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return {
        ...state,
        list: [...state.list.filter(el => el.id !== action.payload.id)]
      };
    }

    case ACTION_TYPES.EDIT: {
      return {
        ...state,
        list: [
          ...state.list.map(item => {
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
      return { ...state, list: [...state.list, action.payload.item] };
    }

    case ACTION_TYPES.CLEAR_ERRORS: {
      return {
        ...state,
        errors: state.errors.filter((error: Error) => error.id != action.payload.id)
      };
    }

    case ACTION_TYPES.ADD_ERROR: {
      const error = {
        id: nanoid(),
        title: action.payload.error
      };
      return { ...state, errors: [...state.errors, error] };
    }

    case ACTION_TYPES.LOAD_MESSAGES: {
      return { ...state, list: action.payload.list };
    }

    case ACTION_TYPES.SET_REQUEST_STATUS: {
      return { ...state, requestStatus: action.payload.requestStatus };
    }

    default:
      return state;
  }
}
