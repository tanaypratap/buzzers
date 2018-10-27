/**
 * @author Shashank
 * @description  This is the root reducer
 */
import {combineReducers} from 'redux';
import work from './mainReducer';

const rootReducer = combineReducers({
  work
});

export default rootReducer;
