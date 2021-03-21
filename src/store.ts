import { createStore } from 'redux';

export const FILTER_VALUES = ['All', 'Done', 'Not done'];
export type IFilterValues = typeof FILTER_VALUES;

export enum ACTION_TYPES {
  REMOVE,
  CHANGE_POSITION,
  CHANGE_STATE,
  EDIT,
  CREATE,
  FILTER_CHANGED,
  CATEGORY_CHANGED
}

export type Action =
  | ActionRemove
  | ActionChangePosition
  | ActionChangeState
  | ActionEdit
  | ActionCreate
  | ActionFilterChanged
  | ActionCategoryChanged;

interface ActionFilterChanged {
  type: typeof ACTION_TYPES.FILTER_CHANGED;
  payload: {
    searchString: string;
  };
}

interface ActionCategoryChanged {
  type: typeof ACTION_TYPES.CATEGORY_CHANGED;
  payload: {
    category: string;
  };
}

interface ActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: {
    id: string;
  };
}

interface ActionChangePosition {
  type: typeof ACTION_TYPES.CHANGE_POSITION;
  payload: {
    id: string;
    number: number;
  };
}

interface ActionChangeState {
  type: typeof ACTION_TYPES.CHANGE_STATE;
  payload: {
    id: string;
    isDone: boolean;
  };
}

interface ActionEdit {
  type: typeof ACTION_TYPES.EDIT;
  payload: {
    id: string;
    name: string;
  };
}

interface ActionCreate {
  type: typeof ACTION_TYPES.CREATE;
  payload: {
    item: Item;
  };
}

export interface Item {
  id: string;
  isDone: boolean;
  name: string;
  position: number;
}

export type Store = {
  list: Item[];
  filterParams: {
    category: string;
    searchString: string;
  };
};

export const initialState: Store = {
  list: [],
  filterParams: {
    category: FILTER_VALUES[0],
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
      previousState.filterParams.searchString = action.payload.category;
      return { ...previousState };
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

export function selectListByFilter(state: Store) {
  state.list = state.list.sort((el1, el2) => el1.position - el2.position);
  switch (state.filterParams.category) {
    case FILTER_VALUES[1]:
      return state.list.filter(
        el => el.isDone && el.name.includes(state.filterParams.searchString)
      );
    case FILTER_VALUES[2]:
      return state.list.filter(
        el => !el.isDone && el.name.includes(state.filterParams.searchString)
      );
    default:
      return state.list.filter(el => el.name.includes(state.filterParams.searchString));
  }
}

const store = createStore(reducer);
export default store;
