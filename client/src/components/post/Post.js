import React, { Fragment, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getPost } from "../../actions/post";

const CommentForm = lazy(() => import("../post/CommentForm"));
const CommentItem = lazy(() => import("../post/CommentItem"));
const Spinner = lazy(() => import("../layout/Spinner"));
const PostItem = lazy(() => import("../posts/PostItem"));

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost, match.params.id]);

  return loading || post === null ? (
    <Suspense fallback={<div>Loading...</div>}>
      <Spinner />
    </Suspense>
  ) : (
    <Fragment>
      <Link to='/posts' className='btn'>
        Back To Posts
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <PostItem post={post} showActions={false} />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <CommentForm postId={post._id} />
      </Suspense>
      <div className='comments'>
        {post.comments.map((comment) => (
          <Suspense fallback={<div>Loading...</div>}>
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={post._id}
            />
          </Suspense>
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(React.memo(Post));
