import React from 'react';
import Comment from '../Comment/Comment';
require('./Post.styles.scss');

const Post = ({ data, loading }) => {
  return (
    <div id="post">
      <h1 className="title">{data.Title}</h1>
      <img src={data.Image}
           className="post-image"
           alt={data.Title}
      />
      <p className="content-txt">{data.Content}</p>
      <div className="comments">
        <span className="comment-title">Yorumlar</span>
        {
          data.Comments.map(comment => <Comment
                                          key={comment.Id}
                                          comment={comment}
                                          loading={loading}
                                        />)
        }
        <Comment />
      </div>
    </div>
  );
};

export default Post;
