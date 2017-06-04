import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { autoRehydrate, persistStore } from 'redux-persist';
import reduxPersist from './reduxPersist';
import RehydrationServices from '../services/rehydrationServices';

/* eslint-disable no-underscore-dangle */
const configureStore = (initialState, middlewares) => {
  let store = composeWithDevTools(
    applyMiddleware(
      ...middlewares
    ),
    autoRehydrate()
  )(createStore)(rootReducer);

  if (reduxPersist.active) {
    // RehydrationServices.updateReducers(store);
  }
  return store;
};
/* eslint-enable */

export default configureStore;