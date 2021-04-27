import { Action, ACTION_TYPES } from '../actionTypes';

export const AUTH_STATE = {
  IDLE: 'All',
  SUCCESS: 'Done',
  FAILURE: 'Not done'
};

export type AUTH_STATE_TYPE =
  | typeof AUTH_STATE.IDLE
  | typeof AUTH_STATE.SUCCESS
  | typeof AUTH_STATE.FAILURE;

export type AuthSlice = {
  state: AUTH_STATE_TYPE;
};

export const authInitialState: AuthSlice = {
  state: AUTH_STATE.IDLE
};

export function authReducer(state: AuthSlice = authInitialState, action: Action): AuthSlice {
  switch (action.type) {
    case ACTION_TYPES.SET_AUTH_STATUS: {
      if (action.payload.state) {
        state.state = AUTH_STATE.SUCCESS;
      } else {
        state.state = AUTH_STATE.FAILURE;
      }
      return { ...state };
    }

    default:
      return state;
  }
}
