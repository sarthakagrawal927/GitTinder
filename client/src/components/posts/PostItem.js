import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import male_image from "../../img/male.png";
import female_image from "../../img/female.png";

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
    userGender,
    userBio,
    likes,
    date,
  },
  showActions,
}) => (
  <div className='post p-1 my-1'>
    {console.log(userGender)}

    <div>
      <Link to={`/profile/${user}`}>
        <img
          className='round-img'
          src={userDP || (userGender === "Male" ? male_image : female_image)}
          alt='DP'
        />
        <h4>{name}</h4>
      </Link>
      <p>{userBio}</p>
    </div>

    <div>
      {category && <p>Category : {category}</p>}
      <div className='post-images'>
        {imageURL.map((imageURL) => (
          <a key={imageURL} href={imageURL}>
            <img className='meme' src={imageURL} alt='meme' />
          </a>
        ))}
      </div>

      <p className='my-1'>{text}</p>
      <p className='post-date'>
        Posted on <Moment format='MMMM Do YYYY, h:mm a'>{date}</Moment>
      </p>

      {showActions && (
        <Fragment>
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
            Comments{""}
            {comments.length > 0 && (
              <span className='comment-count'>{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={() => deletePost(_id)}
              type='button'
              className='btn btn-danger'>
              <i className='fas fa-times' />
            </button>
          )}
        </Fragment>
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
  PostItem,
);
