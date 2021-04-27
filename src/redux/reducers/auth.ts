import { Action, ACTION_TYPES } from '../actionTypes';

export type AuthSlice = {
  state: boolean;
};

export const authInitialState: AuthSlice = {
  state: false
};

export function authReducer(state: AuthSlice = authInitialState, action: Action): AuthSlice {
  switch (action.type) {
    case ACTION_TYPES.LOGIN: {
      state.state = true;
      return { ...state };
    }

    case ACTION_TYPES.LOGOUT: {
      state.state = false;
      return { ...state };
    }

    default:
      return state;
  }
}
