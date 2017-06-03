import { combineReducers } from "redux";
import { reducer as reduxformReducer } from "redux-form";
import BLOG from './containers/Blog/Blog.constants';

import blogReducer from "./containers/Blog/Blog.reducer";


const rootReducer = combineReducers({
  blog: blogReducer,
  form: reduxformReducer.plugin({
    commentForm: (state, action) => {
      switch (action.type) {
        case BLOG.ADD_COMMENT_SUCCESS:
          return undefined;
        default:
          return state;
      }
    }
  }),
});


export default rootReducer;
