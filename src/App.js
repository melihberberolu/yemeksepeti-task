import "babel-polyfill";

import React  from 'react';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import initialState from "./store/initialState";
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import rootSaga from "./sagas/rootSaga";
import Home from './containers/Home/Home.container';

export const store = configureStore(initialState, [
  sagaMiddleware,
]);
sagaMiddleware.run(rootSaga);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default App;