import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import adsReducer from './adsRedux';
import initialState from './initialState';
import usersReducer from './usersRedux';


const subreducers = {
  user: usersReducer,
  ads: adsReducer,
};

const reducer = combineReducers(subreducers);
const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;