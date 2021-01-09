import { combineReducers } from 'redux';
import questions from './questions';
import reccs from './reccs';
import auth from './auth';
import errors from './errors';
import messages from './messages';
import saved_items from './saved_items';

export default combineReducers({
  questions,
  reccs,
  auth,
  errors,
  messages,
  saved_items,
});