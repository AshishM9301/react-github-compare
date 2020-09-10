import {
  GITHUB_LOADING,
  GITHUB_LOADED,
  GITHUB_USERNAME,
  ADD_GITHUB_USER,
} from '../actions/types';

const initialstate = {
  username: '',
  user: null,
  users: [],
  isLoading: null,
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case GITHUB_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GITHUB_LOADED:
      return {
        user: action.payload,
        isLoading: false,
      };
    case GITHUB_USERNAME:
      return {
        username: action.payload,
        isLoading: true,
      };
    case ADD_GITHUB_USER:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        users: [...action.payload],
      };
    default:
      return state;
  }
}
