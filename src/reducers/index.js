import { combineReducers } from 'redux';
import slides from 'reducers/slides';
import loggedIn from 'reducers/loggedIn';

export default combineReducers({
  slides,
  loggedIn,
});
