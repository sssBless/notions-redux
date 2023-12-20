import { Api } from '../../utils/Api';
import { USER_ERROR, USER_SET } from '../types';

export const getUser =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_SET,
        payload: await Api.fetchUser({ email, password }),
      });
    } catch (err) {
      dispatch({ type: USER_ERROR, payload: err.toString() });
    }
  };
