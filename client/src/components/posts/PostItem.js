import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";

import { addLike, removeLike, deletePost } from "../../actions/post";
import unisex_image from "../../img/unisex.webp";
const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: {
    _id,
    text,
    category,
    imageURL,
    name,
    comments,
    user,
    userDP,
    likes,
    date,
  },
  showActions,
}) => (
  <div className='post p-1 my-1'>
    <div>
      <Link to={`/profile/${user}`}>
        <LazyLoad once='true'>
          <img className='round-img' src={userDP || unisex_image} alt='DP' />
        </LazyLoad>

        <h4>{name}</h4>
      </Link>
    </div>

    <div>
      {category && <p className='post-date'>{category}</p>}
      <div className='post-images'>
        {imageURL.map((imageURL) => (
          <a key={imageURL} href={imageURL}>
            <LazyLoad once='true'>
              <img className='meme' src={imageURL} alt='meme' />
            </LazyLoad>
          </a>
        ))}
      </div>

      <p className='my-1'>{text}</p>
      <p className='post-date'>
        <Moment format='MMMM Do YYYY, h:mm a'>{date}</Moment>
      </p>

      {showActions && (
        <div>
          <button
            onClick={() => addLike(_id)}
            type='button'
            className='btn btn-light'>
            <i className='fas fa-thumbs-up' />{" "}
            <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
          </button>
          <button
            onClick={() => removeLike(_id)}
            type='button'
            className='btn btn-light'>
            <i className='fas fa-thumbs-down' />
          </button>
          <Link to={`/posts/${_id}`} className='btn btn-primary'>
            <span className='comment-count'>{comments.length}</span>{" "}
            {comments.length === 1 ? "Comment" : "Comments"}
            {""}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'>
              <i className='fas fa-times' />
            </button>
          )}
        </div>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  React.memo(PostItem),
);
