import { combineReducers } from 'redux';
import counter from './counter';
import total from './total';

export default combineReducers({
  counter,
  total
})
