import { Action, ACTION_TYPES } from '../actionTypes';

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
  isDone: boolean;
  name: string;
  position: number;
}

export type Store = {
  errors: string[];
  list: Item[];
  filterParams: {
    category: ITEM_STATE_FILTER_TYPE;
    searchString: string;
  };
};

export const initialState: Store = {
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

    case ACTION_TYPES.CHANGE_POSITION: {
      return {
        ...previousState,
        list: changePosition(action.payload.id, action.payload.number, previousState.list)
      };
    }

    case ACTION_TYPES.CHANGE_STATE: {
      return {
        ...previousState,
        list: [
          ...previousState.list.map(item => {
            if (item.id === action.payload.id) {
              item.isDone = action.payload.isDone;
            }
            return item;
          })
        ]
      };
    }

    case ACTION_TYPES.EDIT: {
      return {
        ...previousState,
        list: [
          ...previousState.list.map(item => {
            if (item.id === action.payload.id) {
              item.name = action.payload.name;
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

    default:
      return previousState;
  }
}

export function changePosition(id: string, number: number, itemsList: Item[]) {
  let previous;
  let current = 0;
  let temp;

  if (number > 0) {
    previous = 0;
  } else {
    previous = itemsList.length - 1;
  }

  let elms = itemsList.sort((el1, el2) => el1.position - el2.position);
  for (let i = 0; i < elms.length; i++) {
    if (elms[i].id === id) {
      if (number > 0) {
        if (i !== 0) {
          previous = i - 1;
        }
        current = i;
        break;
      } else {
        if (i !== itemsList.length - 1) {
          previous = i + 1;
        }
        current = i;
        break;
      }
    }
  }

  temp = elms[previous].position;
  elms[previous].position = elms[current].position;
  elms[current].position = temp;

  return [...elms];
}
