import {
  GITHUB_LOADING,
  GITHUB_LOADED,
  GITHUB_LOADING_ERROR,
  ADD_GITHUB_USER,
  MESSAGE_SHOW,
  MESSAGE_CLEAR,
} from './types';

export const fetchUser = (userName) => async (dispatch) => {
  dispatch({ type: GITHUB_LOADING });
  const URL = 'https://api.github.com/users/';

  const res = await fetch(`${URL}${userName}`);
  const data = await res.json();

  if (!data) {
    dispatch({ type: GITHUB_LOADING_ERROR, payload: 'No User is Present' });
  } else {
    dispatch({ type: GITHUB_LOADED, payload: data });
  }
};

export const addUser = (data) => (dispatch) => {
  dispatch({ type: ADD_GITHUB_USER, payload: data });
};

export const passMessage = (data) => (dispatch) => {
  dispatch({ type: MESSAGE_SHOW, payload: data });
};

export const clearMessage = (data) => (dispatch) => {
  dispatch({ type: MESSAGE_CLEAR });
};
