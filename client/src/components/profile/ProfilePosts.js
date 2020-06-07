import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfilePosts } from "../../actions/profile";
import PostItem from "./../posts/PostItem";

const ProfilePosts = ({ userID, getProfilePosts, posts }) => {
  useEffect(() => {
    getProfilePosts(userID);
  }, [getProfilePosts, userID]);

  return (
    <Fragment>
      <h1 className='text-primary'>Posts</h1>

      <div className='posts'>
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

ProfilePosts.propTypes = {
  getProfilePosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  userID: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.profile.posts,
});

export default connect(mapStateToProps, { getProfilePosts })(ProfilePosts);
