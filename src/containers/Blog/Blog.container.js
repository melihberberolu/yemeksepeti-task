import React, { Component } from 'react';
require('./Blog.styles.scss');
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../components/Header/Header';
import Post from '../../components/Post/Post';
import * as blogActions from './Blog.actions';
import CommentFormComponent from './view/Blog.CommentForm.component';

class Blog extends Component {

  componentDidMount() {
    const { requestStart, blog } = this.props;
    if (!blog.post) {
      requestStart && requestStart();
    }
  }


  render() {
    const {
      formState,
      blog: {
        loading,
        post,
        addCommentLoading
      }
    } = this.props;

    if (loading) return null; /** Loading Animation **/

    return (
      <div id="blog" className="container">
        { Header() }
        <Post data={post} />
        <CommentFormComponent
          formObject={!!formState.commentForm ? formState.commentForm : {}}
          loading={addCommentLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  blog: state.blog,
  formState: state.form
});

const mapDispatchToProps = (dispatch) => bindActionCreators(blogActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Blog);