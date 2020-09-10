import { combineReducers } from 'redux';
import github from './github';
import message from './message';

export default combineReducers({
  github: github,
  message: message,
});
