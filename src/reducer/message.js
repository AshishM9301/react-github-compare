import { MESSAGE_SHOW, MESSAGE_CLEAR } from '../actions/types';

const initialstate = {
  message: '',
};

export default function message(state = initialstate, action) {
  switch (action.type) {
    case MESSAGE_SHOW:
      return {
        message: action.payload,
      };
    case MESSAGE_CLEAR:
      return {
        ...state,
        message: null,
      };
    default:
      return state;
  }
}
