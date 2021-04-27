import { rootReducer } from './';
import { selectItemsCount, selectListByFilter, selectListTitles } from './selectors';
import { ITEM_STATE_FILTER } from './reducers/filter';
import { ACTION_TYPES } from './actionTypes';
import { initialAuthCheck, login, logout, REQUEST_STATUS, setAuthStatus } from './actions';
import fetchMock from 'fetch-mock';
import { makeTestStore } from '../setupTests';
import {
  changeCategory,
  changeFilter,
  create,
  remove,
  edit,
  clearErrors,
  addError,
  addElement,
  getElements,
  editElement,
  removeElement
} from './actions';
import { AUTH_STATE } from './reducers/auth';

describe('root reducer test', () => {
  let items = null;
  let state = null;
  beforeEach(() => {
    items = [
      { id: '0', title: 'first', isChecked: false },
      { id: '1', title: 'second', isChecked: false },
      { id: '2', title: 'last', isChecked: false }
    ];
    state = {
      filter: { category: ITEM_STATE_FILTER.ALL, searchString: '' },
      todo: {
        list: items,
        errors: []
      }
    };
  });

  test('remove existing item from list', () => {
    const removeItem = items[0];
    const action = { type: ACTION_TYPES.REMOVE, payload: { id: removeItem.id } };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.list).not.toEqual(items);
    expect(newItems.todo.list).not.toContain(removeItem);
  });

  test('remove not existing item from list', () => {
    const action = { type: ACTION_TYPES.REMOVE, payload: { id: '1000' } };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.list).toEqual(items);
  });

  test('create new item', () => {
    const newItem = { id: '3', name: 'lastLast', isDone: false };
    const action = { type: ACTION_TYPES.CREATE, payload: { item: newItem } };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.list).toContain(newItem);
  });

  test('pass wrong action title', () => {
    const action = { type: 'credcdcdcdate' };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.list).toEqual(items);
  });

  test('remove all errors', () => {
    state = {
      filter: { category: ITEM_STATE_FILTER.ALL, searchString: '' },
      todo: {
        list: items,
        errors: ['1', '2']
      }
    };
    const action = { type: ACTION_TYPES.CLEAR_ERRORS, payload: {} };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.errors).toHaveLength(0);
  });

  test('add new error', () => {
    const action = { type: ACTION_TYPES.ADD_ERROR, payload: { error: '1' } };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.errors).toHaveLength(1);
    expect(newItems.todo.errors).toMatchObject([{ id: expect.any(String), title: '1' }]);
  });

  test('set successful auth status', () => {
    const action = { type: ACTION_TYPES.SET_AUTH_STATUS, payload: { state: true } };
    const newItems = rootReducer(state, action);
    expect(newItems.auth.state).toEqual(AUTH_STATE.SUCCESS);
  });

  test('set failure auth status', () => {
    const action = { type: ACTION_TYPES.SET_AUTH_STATUS, payload: { state: false } };
    const newItems = rootReducer(state, action);
    expect(newItems.auth.state).toEqual(AUTH_STATE.FAILURE);
  });

  test('set request status', () => {
    const requestStatus = REQUEST_STATUS.SUCCESS;
    const action = {
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: { requestStatus }
    };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.requestStatus).toEqual(requestStatus);
  });

  test('load messages', () => {
    const list = [{ id: '1234', title: 'None', isChecked: true }];
    const action = {
      type: ACTION_TYPES.LOAD_MESSAGES,
      payload: { list }
    };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.list).toEqual(list);
  });

  test('edit messages', () => {
    const item = { id: '0', title: 'firstEdit', isChecked: true };
    const action = {
      type: ACTION_TYPES.EDIT,
      payload: { id: item.id, title: item.title, isChecked: item.isChecked }
    };
    const newItems = rootReducer(state, action);
    expect(newItems.todo.list.find(el => el.id === item.id)).toEqual(item);
  });
});

describe('selectListByFilter tests', () => {
  let items = null;
  beforeEach(() => {
    items = [
      { id: '0', title: 'first', isChecked: true },
      { id: '1', title: 'second', isChecked: false },
      { id: '2', title: 'last', isChecked: false }
    ];
  });

  test('get done elements', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.DONE, searchString: '' },
      todo: {
        list: items,
        errors: []
      }
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(1);
    expect(newItems).toEqual(items.filter(el => el.isChecked));
  });

  test('get all elements', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.ALL, searchString: '' },
      todo: {
        list: items,
        errors: []
      }
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(3);
    expect(newItems).toEqual(items);
  });

  test('get elements in progress', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '' },
      todo: {
        list: items,
        errors: []
      }
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(2);
    expect(newItems).toEqual(items.filter(el => !el.isChecked));
  });

  test('get done element with active filter', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.DONE, searchString: 'first' },
      todo: {
        list: items,
        errors: []
      }
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(1);
    expect(newItems).toContain(items[0]);
  });

  test('get element in progress with active filter', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: 'second' },
      todo: {
        list: items,
        errors: []
      }
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(1);
    expect(newItems).toContain(items[1]);
  });

  test('try to find not existent element', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '12' },
      todo: {
        list: items,
        errors: []
      }
    };
    const newItems = selectListByFilter(state);
    expect(newItems).toHaveLength(0);
  });
});

describe('selectItemsCount tests', () => {
  let items = null;
  beforeEach(() => {
    items = [
      { id: '0', title: 'first', isChecked: true },
      { id: '1', title: 'second', isChecked: false },
      { id: '2', title: 'last', isChecked: false }
    ];
  });

  test('return correct counts of items', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '12' },
      todo: {
        list: items,
        errors: []
      }
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
      { id: '0', title: 'first', isChecked: true },
      { id: '1', title: 'second', isChecked: false },
      { id: '2', title: 'last', isChecked: false }
    ];
  });

  test('return correct counts of items', () => {
    const state = {
      filter: { category: ITEM_STATE_FILTER.NOT_DONE, searchString: '12' },
      todo: {
        list: items,
        errors: []
      }
    };
    const titles = selectListTitles(state);
    expect(titles).toEqual(['first', 'second', 'last']);
  });
});

describe('actions tests', () => {
  test('create', () => {
    const payload = { id: '', isChecked: false, title: 'string' };
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

  test('setAuthStatus', () => {
    const state = false;
    const expectedAction = {
      type: ACTION_TYPES.SET_AUTH_STATUS,
      payload: { state }
    };
    expect(setAuthStatus(state)).toEqual(expectedAction);
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
      isChecked: false
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
  afterEach(() => fetchMock.reset());

  test('success', async () => {
    const list = [
      {
        id: '123',
        title: 'noname',
        isChecked: false
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
  afterEach(() => fetchMock.reset());

  test('success', async () => {
    const title = 'empty';
    const item = {
      id: '123',
      title,
      isChecked: false
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
    const item = {
      id: '123',
      title,
      isChecked: false
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
  afterEach(() => fetchMock.reset());

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

  describe('initialAuthCheck tests', () => {
    afterEach(() => fetchMock.reset());

    test('success', async () => {
      fetchMock.mock(
        `http://localhost:3001/auth`,
        {
          status: 200,
          body: {}
        },
        {
          method: 'GET'
        }
      );

      const store = makeTestStore({ useMockStore: true });
      await store.dispatch(initialAuthCheck());
      expect(store.getActions()).toEqual([
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.LOADING }
        },
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.SUCCESS }
        },
        { type: ACTION_TYPES.SET_AUTH_STATUS, payload: { state: true } }
      ]);
    });

    test('failure', async () => {
      const error = 'error';
      fetchMock.mock(
        `http://localhost:3001/auth`,
        {
          status: 403,
          body: { error }
        },
        {
          method: 'GET'
        }
      );

      const store = makeTestStore({ useMockStore: true });
      await store.dispatch(initialAuthCheck());
      expect(store.getActions()).toEqual([
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.LOADING }
        },
        { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
        { type: ACTION_TYPES.SET_AUTH_STATUS, payload: { state: false } },
        { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
      ]);
    });
  });

  describe('logout tests', () => {
    afterEach(() => fetchMock.reset());

    test('success', async () => {
      fetchMock.mock(
        `http://localhost:3001/auth`,
        {
          status: 200,
          body: {}
        },
        {
          method: 'DELETE'
        }
      );

      const store = makeTestStore({ useMockStore: true });
      await store.dispatch(logout());
      expect(store.getActions()).toEqual([
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.LOADING }
        },
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.SUCCESS }
        },
        { type: ACTION_TYPES.SET_AUTH_STATUS, payload: { state: false } }
      ]);
    });

    test('failure', async () => {
      const error = 'error';
      fetchMock.mock(
        `http://localhost:3001/auth`,
        {
          status: 403,
          body: { error }
        },
        {
          method: 'DELETE'
        }
      );

      const store = makeTestStore({ useMockStore: true });
      await store.dispatch(logout());
      expect(store.getActions()).toEqual([
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.LOADING }
        },
        { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
        { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
      ]);
    });
  });

  describe('login tests', () => {
    afterEach(() => fetchMock.reset());
    const username = '';
    const password = '';

    test('success', async () => {
      fetchMock.mock(
        `http://localhost:3001/auth`,
        {
          status: 200,
          body: { username, password }
        },
        {
          method: 'POST'
        }
      );

      const store = makeTestStore({ useMockStore: true });
      await store.dispatch(login(username, password));
      expect(store.getActions()).toEqual([
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.LOADING }
        },
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.SUCCESS }
        },
        { type: ACTION_TYPES.SET_AUTH_STATUS, payload: { state: true } }
      ]);
    });

    test('failure', async () => {
      const error = 'error';
      fetchMock.mock(
        `http://localhost:3001/auth`,
        {
          status: 403,
          body: { error }
        },
        {
          method: 'POST'
        }
      );

      const store = makeTestStore({ useMockStore: true });
      await store.dispatch(login(username, password));
      expect(store.getActions()).toEqual([
        {
          type: ACTION_TYPES.SET_REQUEST_STATUS,
          payload: { requestStatus: REQUEST_STATUS.LOADING }
        },
        { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: { requestStatus: REQUEST_STATUS.ERROR } },
        { type: ACTION_TYPES.ADD_ERROR, payload: { error } }
      ]);
    });
  });
});
