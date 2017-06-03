import React from 'react';
import { render } from "react-dom";
import App from './App';
import registerServiceWorker from './registerServiceWorker';
require("./assets/sass/main.scss");

render(
  <App />,
  document.getElementById("app")
);
registerServiceWorker();
