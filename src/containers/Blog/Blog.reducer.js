import BLOG from "./Blog.constants";

const initialState = {
  loading: true,
  post: null,
  addCommentLoading: false,
};

const blogReducer = (state: Object = initialState, action) => {

  switch (action.type) {
    case BLOG.REQUEST_START:
      return {
        ...state,
        loading: action.loading,
      };

    case BLOG.REQUEST_SUCCESS:
      return {
        ...state,
        post: action.post,
        loading: action.loading
      };

    case BLOG.REQUEST_ERROR:
      return {
        ...state,
        error: action.error,
        loading: action.loading
      };

    case BLOG.ADD_COMMENT_START: {
      return {
        ...state,
        addCommentLoading: action.addCommentLoading
    }
    }

    case BLOG.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          Comments: [action.comment, ...state.post.Comments]
        },
        addCommentLoading: action.addCommentLoading
      };
    default:
      return state;
  }
};


export default blogReducer;
