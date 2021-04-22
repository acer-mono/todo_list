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

export type FilterSlice = {
  searchString: string;
  category: ITEM_STATE_FILTER_TYPE;
};

export const filterInitialState: FilterSlice = {
  searchString: '',
  category: ITEM_STATE_FILTER.ALL
};

export function filterReducer(
  state: FilterSlice = filterInitialState,
  action: Action
): FilterSlice {
  switch (action.type) {
    case ACTION_TYPES.FILTER_CHANGED: {
      state.searchString = action.payload.searchString;
      return { ...state };
    }

    case ACTION_TYPES.CATEGORY_CHANGED: {
      state.category = action.payload.category;
      return { ...state };
    }

    default:
      return state;
  }
}
