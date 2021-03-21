import { Store } from './reducers/todos';

export const FILTER_VALUES = ['All', 'Done', 'Not done'];
export type FilterValues = typeof FILTER_VALUES;

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
