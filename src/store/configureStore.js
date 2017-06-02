import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../rootReducer";

/* eslint-disable no-underscore-dangle */
const configureStore = (initialState, middlewares) => {
  return createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
      applyMiddleware(
        ...middlewares,
      ),
    )
  );
};
/* eslint-enable */

export default configureStore;