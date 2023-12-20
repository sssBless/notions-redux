import { USER_ERROR, USER_LOADING, USER_SET } from '../types';

const DEFAULT_STATE = {
  data: null,
  loading: false,
  error: null,
};

export function userReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case USER_LOADING:
      return { ...state, loading: true, error: null };

    case USER_SET:
      return { data: action.payload, loading: false, error: null };

    case USER_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
