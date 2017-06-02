import React  from 'react';
import './App.css';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import initialState from "./store/initialState";
import Home from './containers/Home/Home.container';

export const store = configureStore(initialState, [
//  sagaMiddleware,
]);

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