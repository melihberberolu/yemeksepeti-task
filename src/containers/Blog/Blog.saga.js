import { put, call, take, takeLatest, takeEvery, select } from "redux-saga/effects";
import { delay } from 'redux-saga';
import data from '../../constants/yemeksepetiTask';
import * as blogActions from "./Blog.actions";

import BLOG from './Blog.constants';

function* getPost() {
  yield delay(250);
  yield put(blogActions.requestSuccess(data))
}

function* comment({ payload }) {
  yield put(blogActions.addCommentStart());
  yield delay(500);

  const comment = {
    "Id": Math.floor(Math.random() * 90000) + 10000,
    "Content": payload.comment,
    "Date": new Date(),
    "User": {
      "DisplayName": payload.name,
      "AvatarImageUrl": "http://cdn.yemek.com/assets/images/profile-default.jpg"
    }
  };

  yield put(blogActions.addCommentSuccess(comment));

}

export default function* sagaWatcher() {
  yield takeLatest(BLOG.REQUEST_START, getPost);
  yield takeEvery("##form/COMMENT_REQUEST", comment);
}