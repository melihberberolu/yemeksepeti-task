import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';

/* eslint-disable no-underscore-dangle */
const configureStore = (initialState, middlewares) => {
  return createStore(
    rootReducer,
    initialState,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    composeWithDevTools(
      applyMiddleware(
        ...middlewares
      ),
    )
  );
};
/* eslint-enable */

export default configureStore;