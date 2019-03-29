import { createStore, applyMiddleware } from 'redux';
import { combineReducers } from 'redux-immutable';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger'
import Immutable from 'immutable';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';


// const logger = createLogger();

// const reducer = combineReducers(reducers);

const store = createStore(
  rootReducer,
  Immutable.Map({}),
  composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;
