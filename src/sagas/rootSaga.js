import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from "redux-form-saga";
import blogSaga from '../containers/Blog/Blog.saga';

export default function* rootSaga() {
  yield all([
    fork(formActionSaga),
    fork(blogSaga)
  ]);
}