import React, { Fragment, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPostsByCategory } from "../../actions/post";

const PostItem = lazy(() => import("./PostItem"));
const CategoryNavbar = lazy(() => import("../layout/CategoryNavbar"));

const CategoryPosts = ({
  getPostsByCategory,
  post: posts,
  categoryName: category,
}) => {
  useEffect(() => {
    getPostsByCategory();
  }, [getPostsByCategory]);

  return (
    <Fragment>
      <h1 className='large text-primary'>{category} Posts</h1>

      <Suspense fallback={<div>Loading....</div>}>
        <CategoryNavbar />
        <div className='posts'>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </Suspense>
    </Fragment>
  );
};

CategoryPosts.propTypes = {
  getPostsByCategory: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  category: state.category,
});

export default connect(mapStateToProps, { getPostsByCategory })(
  React.memo(CategoryPosts),
);
