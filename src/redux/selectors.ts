import { ITEM_STATE_FILTER, Store } from './reducers/todos';

export function selectListByFilter(state: Store) {
  state.list = state.list.sort((el1, el2) => el1.position - el2.position);
  switch (state.filterParams.category) {
    case ITEM_STATE_FILTER.DONE:
      return state.list.filter(
        el => el.isDone && el.name.includes(state.filterParams.searchString)
      );
    case ITEM_STATE_FILTER.NOT_DONE:
      return state.list.filter(
        el => !el.isDone && el.name.includes(state.filterParams.searchString)
      );
    default:
      return state.list.filter(el => el.name.includes(state.filterParams.searchString));
  }
}

export function selectErrors(state: Store) {
  return [...state.errors];
}
