import BLOG from "./Blog.constants";

export const requestStart = () => {
  return {
    type: BLOG.REQUEST_START,
    loading: true
  };
};

export const requestSuccess = (post) => {
  return {
    type: BLOG.REQUEST_SUCCESS,
    post,
    loading: false
  };
};

export const requestError = (errors) => {
  return {
    type: BLOG.REQUEST_ERROR,
    errors,
    loading: false
  };
};

export const addCommentStart = () => {
  return {
    type: BLOG.ADD_COMMENT_START,
    addCommentLoading: true,
  }
};

export const addCommentSuccess = (comment) => {
  return {
    type: BLOG.ADD_COMMENT_SUCCESS,
    comment,
    addCommentLoading: false,
  }
};
