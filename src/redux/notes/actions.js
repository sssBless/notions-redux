import { Api } from '../../utils/Api';
import {
  NOTES_ERROR,
  NOTES_LOADING,
  NOTES_SET,
  NOTE_ADD,
  NOTE_DELETE,
  NOTE_EDIT,
} from '../types';

export const getNotes = (userId) => async (dispatch) => {
  try {
    dispatch({ type: NOTES_LOADING });
    dispatch({ type: NOTES_SET, payload: await Api.fecthNotes(userId) });
  } catch (err) {
    dispatch({ type: NOTES_ERROR, payload: err.toString() });
  }
};

export const deleteNote = (id) => async (dispatch) => {
  dispatch({ type: NOTE_DELETE, payload: id });
  Api.deleteNote(id);
};

export const addNote =
  ({ id, userId, title, body }) =>
  (dispatch) => {
    try {
      dispatch({ type: NOTE_ADD, payload: { id, userId, title, body } });
      Api.addNote({ id, userId, title, body });
    } catch (err) {
      dispatch({ type: NOTES_ERROR, payload: err.toString() });
    }
  };

export const updateNote =
  ({ id, userId, title, body }) =>
  (dispatch) => {
    dispatch({ type: NOTE_EDIT, payload: { id, userId, title, body } });
    Api.updateNote({ id, title, body });
  };
