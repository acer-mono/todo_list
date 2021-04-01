import { changePosition, ITEM_STATE_FILTER, reducer } from './reducers/todos';
import { selectListByFilter } from './selectors';
import { ACTION_TYPES } from './actionTypes';

describe('changePosition tests', () => {
  let items = null;
  beforeEach(() => {
    items = [
      { id: '0', name: 'first', isDone: false, position: 0 },
      { id: '1', name: 'second', isDone: false, position: 1 },
      { id: '2', name: 'last', isDone: false, position: 2 }
    ];
  });

  test('move up second element to one position', () => {
    const updatedList = changePosition('1', 1, items);
    const second = updatedList.find(el => el.id === '1');
    const first = updatedList.find(el => el.id === '0');
    expect(first.position).toBe(1);
    expect(second.position).toBe(0);
  });

  test('move down second element to one position', () => {
    const updatedList = changePosition('1', -1, items);
    const second = updatedList.find(el => el.id === '1');
    const last = updatedList.find(el => el.id === '2');
    expect(second.position).toBe(2);
    expect(last.position).toBe(1);
  });

  test('move up first element to one position', () => {
    const updatedList = changePosition('0', 1, items);
    const second = updatedList.find(el => el.id === '0');
    expect(second.position).toBe(0);
  });

  test('move down last element to one position', () => {
    const updatedList = changePosition('2', -1, items);
    const second = updatedList.find(el => el.id === '2');
    expect(second.position).toBe(2);
  });
});

describe('reducer test', () => {
  let items = null;
  let state = null;
  beforeEach(() => {
    items = [
      { id: '0', name: 'first', isDone: false, position: 0 },
      { id: '1', name: 'second', isDone: false, position: 1 },
      { id: '2', name: 'last', isDone: false, position: 2 }
    ];
    state = {
      filterParams: { category: ITEM_STATE_FILTER.ALL, searchString: '' },
      list: items,
      errors: []
    };
  });

  test('remove existing item from list', () => {
    const removeItem = items[0];
    const action = { type: ACTION_TYPES.REMOVE, payload: { id: removeItem.id } };
    const newItems = reducer(state, action);
    expect(newItems.list).not.toEqual(items);
    expect(newItems.list).not.toContain(removeItem);
  });

  test('remove not existing item from list', () => {
    const action = { type: ACTION_TYPES.REMOVE, payload: { id: '1000' } };
    const newItems = reducer(state, action);
    expect(newItems.list).toEqual(items);
  });

  test('change position of second item', () => {
    const changePositionItem = items[1];
    expect(changePositionItem.position).toBe(1);
    const action = {
      type: ACTION_TYPES.CHANGE_POSITION,
      payload: { id: changePositionItem.id, number: 1 }
    };
    reducer(state, action);
    expect(changePositionItem.position).toBe(0);
  });

  test('change state of item', () => {
    const changeStateItem = items[1];
    expect(changeStateItem.isDone).toBe(false);
    const action = {
      type: ACTION_TYPES.CHANGE_STATE,
      payload: { id: changeStateItem.id, isDone: true }
    };
    reducer(state, action);
    expect(changeStateItem.isDone).not.toBe(false);
  });

  test('edit item', () => {
    const editItem = items[1];
    expect(editItem.name).toBe('second');
    const action = { type: ACTION_TYPES.EDIT, payload: { id: editItem.id, name: 'first' } };
    reducer(state, action);
    expect(editItem.name).toBe('first');
  });

  test('create new item', () => {
    const newItem = { id: '3', name: 'lastLast', isDone: false, position: 3 };
    const action = { type: ACTION_TYPES.CREATE, payload: { item: newItem } };
    const newItems = reducer(state, action);
    expect(newItems.list).toContain(newItem);
  });

  test('pass wrong action name', () => {
    const action = { type: 'credcdcdcdate' };
    const newItems = reducer(state, action);
    expect(newItems.list).toEqual(items);
  });

  test('remove all errors', () => {
    state = {
      filterParams: { category: ITEM_STATE_FILTER.ALL, searchString: '' },
      list: items,
      errors: ['1', '2']
    };
    const action = { type: ACTION_TYPES.CLEAR_ERRORS, payload: {} };
    const newItems = reducer(state, action);
    expect(newItems.errors).toHaveLength(0);
  });

  test('add new error', () => {
    const action = { type: ACTION_TYPES.ADD_ERROR, payload: { error: '1' } };
    const newItems = reducer(state, action);
    expect(newItems.errors).toHaveLength(1);
    expect(newItems.errors).toContain('1');
  });
});

describe('selectListByFilter tests', () => {
  let items = null;
  beforeEach(() => {
    items = [
      { id: '0', name: 'first', isDone: true, position: 0 },
      { id: '1', name: 'second', isDone: false, position: 1 },
      { id: '2', name: 'last', isDone: false, position: 2 }
    ];
  });

  test('get done elements', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.DONE, searchString: '' },
      list: items
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(1);
    expect(newItems).toEqual(items.filter(el => el.isDone));
  });

  test('get all elements', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.ALL, searchString: '' },
      list: items
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(3);
    expect(newItems).toEqual(items);
  });

  test('get elements in progress', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '' },
      list: items
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(2);
    expect(newItems).toEqual(items.filter(el => !el.isDone));
  });

  test('get done element with active filter', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.DONE, searchString: 'first' },
      list: items
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(1);
    expect(newItems).toContain(items[0]);
  });

  test('get element in progress with active filter', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: 'second' },
      list: items
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(1);
    expect(newItems).toContain(items[1]);
  });

  test('try to find not existent element', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '12' },
      list: items
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(0);
  });
});
