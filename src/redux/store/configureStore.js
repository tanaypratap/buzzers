/**
 * @author Shashank
 * @description  Redux Store is configured here
 */
import {createStore, compose, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

export default function configureStore() {
  return createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
  );
}