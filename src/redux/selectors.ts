import { Error, Item, ITEM_STATE_FILTER, ITEM_STATE_FILTER_TYPE, Store } from './reducers/todos';
import { createSelector } from 'reselect';

export function selectListByItemState(list: Item[], itemState: ITEM_STATE_FILTER_TYPE): Item[] {
  switch (itemState) {
    case ITEM_STATE_FILTER.DONE:
      return list.filter(el => el.isChecked);
    case ITEM_STATE_FILTER.NOT_DONE:
      return list.filter(el => !el.isChecked);
    default:
      return list;
  }
}

export function selectListByFilterString(list: Item[], filterString: string): Item[] {
  return list.filter(el => el.title.toLowerCase().includes(filterString.toLowerCase()));
}

export const selectListByFilter = createSelector(
  (state: Store) => state.list,
  (state: Store) => state.filterParams.category,
  (state: Store) => state.filterParams.searchString,
  (list: Item[], category: ITEM_STATE_FILTER_TYPE, filterString: string) =>
    selectListByItemState(selectListByFilterString(list, filterString), category)
);

export const selectErrors = createSelector(
  (state: Store) => state.errors,
  (errors: Error[]) => errors
);

export const selectItemsCount = createSelector(
  (state: Store) => state.list,
  (list: Item[]) => ({
    [ITEM_STATE_FILTER.ALL]: list.length,
    [ITEM_STATE_FILTER.DONE]: selectListByItemState(list, ITEM_STATE_FILTER.DONE).length,
    [ITEM_STATE_FILTER.NOT_DONE]: selectListByItemState(list, ITEM_STATE_FILTER.NOT_DONE).length
  })
);

export const selectListTitles = createSelector(
  (state: Store) => state.list,
  (list: Item[]): string[] => list.map(el => el.title)
);
