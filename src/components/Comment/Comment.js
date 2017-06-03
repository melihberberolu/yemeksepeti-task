import React from 'react';
import moment from 'moment';

require('moment/locale/tr');
require('./Comment.styles.scss');

const Comment = ({ comment }) => {
  if (!comment) return null;
  return (
    <div className="comment-wrapper">
      <div className="comment-row">
        <div className="left">
          <img src={comment.User.AvatarImageUrl}
               className="user-img"
          />
          <span className="user-name">{comment.User.DisplayName}</span>
        </div>
        <div className="right">
          <span className="date">{moment(comment.Date).format('DD MMMM YYYY HH:mm')}</span>
        </div>
      </div>
      <p>{comment.Content}</p>
    </div>
  );
};

export default Comment;
