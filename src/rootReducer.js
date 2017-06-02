import { combineReducers } from "redux";
import { reducer as reduxformReducer } from "redux-form";

import homeReducer from "./containers/Home/Home.reducer";

// import HOME from "./containers/Home/Home.constants";


const rootReducer = combineReducers({
  home: homeReducer,
  form: reduxformReducer,
});


export default rootReducer;
