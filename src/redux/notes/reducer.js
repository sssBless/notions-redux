import {
  NOTES_ERROR,
  NOTES_LOADING,
  NOTES_SET,
  NOTE_ADD,
  NOTE_DELETE,
  NOTE_EDIT,
} from '../types';

const DEFAULT_STATE = {
  data: [],
  loading: false,
  error: null,
};

export function notesReducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case NOTES_LOADING:
      return { loading: true, error: null, data: [] };

    case NOTES_SET:
      return {
        data: action.payload,
        loading: false,
        error: null,
      };

    case NOTE_ADD:
      return { ...state, data: state.data.concat(action.payload) };

    case NOTE_DELETE:
      return {
        ...state,
        data: [...state.data.filter((item) => item.id !== action.payload)],
      };

    case NOTE_EDIT:
      return {
        ...state,
        data: [
          ...state.data.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        ],
      };

    case NOTES_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
