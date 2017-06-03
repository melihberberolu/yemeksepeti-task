import React, {
  PropTypes,
} from 'react';
import { reduxForm, Field } from 'redux-form';
import { createFormAction } from 'redux-form-saga';
import Input from '../../../components/Input/Input';
import {reset} from 'redux-form';

const constantPrefix = "##form/COMMENT";
export const formAction = createFormAction(constantPrefix);


function required(value, msg) {
  if (!value) {
    return msg;
  } else {
    return undefined;
  }
}

const CommentForm = (props) => {
  const {
    handleSubmit,
    dispatch,
    submitting,
    fields: {
      name,
      comment
    },
    loading
  } = props;

  return (
    <div>
      <form
        className="form-style"
        id="form-comment"
        name="commentForm"
        onSubmit={handleSubmit(formAction)}
        noValidate>
        <Field
          name="name"
          id="name"
          component={Input}
          autoComplete="off"
          validate={[
            (val) => required(val, "Lütfen boş bırakmayınız.")
          ]}
          placeholder="Adınız"
          {...name}
          required
        />
        <Field
          name="comment"
          id="comment"
          component={Input}
          autoComplete="off"
          validate={[
            (val) => required(val, "Lütfen boş bırakmayınız.")
          ]}
          placeholder="Yorumunuz"
          {...comment}
          required
        />

        <button
          type="submit"
          className="btn">
          {
            loading &&
              <i className="fa fa-refresh fa-spin" />
          }
          <span>
              Gönder
          </span>
        </button>

      </form>
    </div>
  );
};

const BlogCommentForm = reduxForm({
  form: "commentForm",
  fields: [
    "name",
    "comment"
  ]
})(CommentForm);

export default BlogCommentForm;
