import { changePosition, ITEM_STATE_FILTER, reducer } from './reducers/todos';
import { selectItemsCount, selectListByFilter, selectListTitles } from './selectors';
import { ACTION_TYPES } from './actionTypes';
import fetchMock from 'fetch-mock';
import { makeTestStore } from '../setupTests';
import {
  changeCategory,
  changeFilter,
  create,
  remove,
  changePosition as changePos,
  changeState,
  edit,
  clearErrors,
  addError,
  addElement,
  REQUEST_STATUS,
  getElements,
  editElement,
  removeElement
} from './actions';

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

  test('pass wrong action title', () => {
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

describe('selectItemsCount tests', () => {
  let items = null;
  beforeEach(() => {
    items = [
      { id: '0', name: 'first', isDone: true, position: 0 },
      { id: '1', name: 'second', isDone: false, position: 1 },
      { id: '2', name: 'last', isDone: false, position: 2 }
    ];
  });

  test('return correct counts of items', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '12' },
      list: items
    };
    const counts = selectItemsCount(state);
    expect(counts[ITEM_STATE_FILTER.ALL]).toBe(3);
    expect(counts[ITEM_STATE_FILTER.DONE]).toBe(1);
    expect(counts[ITEM_STATE_FILTER.NOT_DONE]).toBe(2);
  });
});

describe('selectListTitles tests', () => {
  let items = null;
  beforeEach(() => {
    items = [
      { id: '0', name: 'first', isDone: true, position: 0 },
      { id: '1', name: 'second', isDone: false, position: 1 },
      { id: '2', name: 'last', isDone: false, position: 2 }
    ];
  });

  test('return correct counts of items', () => {
    const state = {
      filterParams: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '12' },
      list: items
    };
    const titles = selectListTitles(state);
    expect(titles).toEqual(['first', 'second', 'last']);
  });
});

describe('actions tests', () => {
  test('create', () => {
    const payload = { id: '', isDone: false, name: 'string', position: 1 };
    const expectedAction = {
      type: ACTION_TYPES.CREATE,
      payload
    };
    expect(create(payload)).toEqual(expectedAction);
  });

  test('changeFilter', () => {
    const payload = { searchString: '' };
    const expectedAction = {
      type: ACTION_TYPES.FILTER_CHANGED,
      payload
    };
    expect(changeFilter(payload)).toEqual(expectedAction);
  });

  test('changeCategory', () => {
    const payload = { category: '' };
    const expectedAction = {
      type: ACTION_TYPES.CATEGORY_CHANGED,
      payload
    };
    expect(changeCategory(payload)).toEqual(expectedAction);
  });

  test('remove', () => {
    const payload = { id: '' };
    const expectedAction = {
      type: ACTION_TYPES.REMOVE,
      payload
    };
    expect(remove(payload)).toEqual(expectedAction);
  });

  test('changePosition', () => {
    const payload = { id: '', number: 1 };
    const expectedAction = {
      type: ACTION_TYPES.CHANGE_POSITION,
      payload
    };
    expect(changePos(payload)).toEqual(expectedAction);
  });

  test('changeState', () => {
    const payload = { id: '', isDone: true };
    const expectedAction = {
      type: ACTION_TYPES.CHANGE_STATE,
      payload
    };
    expect(changeState(payload)).toEqual(expectedAction);
  });

  test('edit', () => {
    const payload = { id: '', name: '' };
    const expectedAction = {
      type: ACTION_TYPES.EDIT,
      payload
    };
    expect(edit(payload)).toEqual(expectedAction);
  });

  test('clearErrors', () => {
    const payload = {};
    const expectedAction = {
      type: ACTION_TYPES.CLEAR_ERRORS,
      payload
    };
    expect(clearErrors(payload)).toEqual(expectedAction);
  });

  test('addError', () => {
    const payload = { error: '' };
    const expectedAction = {
      type: ACTION_TYPES.ADD_ERROR,
      payload
    };
    expect(addError(payload)).toEqual(expectedAction);
  });
});

describe('addElement tests', () => {
  afterEach(() => fetchMock.reset());

  test('success', async () => {
    const title = 'empty';
    const position = 10;
    const element = {
      id: '123',
      title,
      position,
      isCheched: false
    };

    fetchMock.mock(
      'http://localhost:3001/todos',
      {
        status: 200,
        body: element
      },
      {
        method: 'POST'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(addElement(title, position));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.CREATE, payload: { item: element } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.SUCCESS } }
    ]);
  });

  test('failure', async () => {
    const title = 'empty';
    const position = 10;
    const error = 'error';

    fetchMock.mock(
      'http://localhost:3001/todos',
      {
        status: 500,
        body: {
          error
        }
      },
      {
        method: 'POST'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(addElement(title, position));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
      { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
    ]);
  });
});

describe('getElements tests', () => {
  test('success', async () => {
    const list = [
      {
        id: '123',
        title: 'noname',
        position: 1,
        isCheched: false
      }
    ];
    fetchMock.mock(
      'http://localhost:3001/todos',
      {
        status: 200,
        body: list
      },
      {
        method: 'GET'
      }
    );
    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(getElements());
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.SUCCESS } },
      { type: ACTION_TYPES.LOAD_MESSAGES, payload: { list } }
    ]);
  });

  test('failure', async () => {
    const error = 'error';
    fetchMock.mock(
      'http://localhost:3001/todos',
      {
        status: 500,
        body: { error }
      },
      {
        method: 'GET'
      }
    );
    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(getElements());
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
      { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
    ]);
  });
});

describe('editElement tests', () => {
  test('success', async () => {
    const title = 'empty';
    const position = 10;
    const item = {
      id: '123',
      title,
      position,
      isCheched: false
    };

    fetchMock.mock(
      `http://localhost:3001/todos/${item.id}`,
      {
        status: 200,
        body: item
      },
      {
        method: 'PUT'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(editElement(item));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.SUCCESS } },
      { type: ACTION_TYPES.EDIT, payload: { ...item } }
    ]);
  });

  test('failure', async () => {
    const title = 'empty';
    const position = 10;
    const item = {
      id: '123',
      title,
      position,
      isCheched: false
    };
    const error = 'error';

    fetchMock.mock(
      `http://localhost:3001/todos/${item.id}`,
      {
        status: 500,
        body: { error }
      },
      {
        method: 'PUT'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(editElement(item));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
      { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
    ]);
  });
});

describe('removeElement tests', () => {
  test('success', async () => {
    const id = '1';
    fetchMock.mock(
      `http://localhost:3001/todos/${id}`,
      {
        status: 200,
        body: { id }
      },
      {
        method: 'DELETE'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(removeElement(id));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.SUCCESS } },
      { type: ACTION_TYPES.REMOVE, payload: { id } }
    ]);
  });

  test('failure', async () => {
    const id = '1';
    const error = 'error';
    fetchMock.mock(
      `http://localhost:3001/todos/${id}`,
      {
        status: 500,
        body: { error }
      },
      {
        method: 'DELETE'
      }
    );

    const store = makeTestStore({ useMockStore: true });
    await store.dispatch(removeElement(id));
    expect(store.getActions()).toEqual([
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.LOADING } },
      { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
      { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
    ]);
  });
});
