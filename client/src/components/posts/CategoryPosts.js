import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getPostsByCategory } from "../../actions/post";
import { lazy } from "react";

//const PostItem = loadable(() => import("./PostItem"));
const CategoryNavbar = lazy(() => import("../layout/CategoryNavbar"));

const Posts = ({ getPostsByCategory, post: posts }) => {
  useEffect(() => {
    getPostsByCategory();
  }, [getPostsByCategory]);

  console.log("inside component");

  return (
    <Fragment>
      <h1 className='large text-primary'>Posts</h1>

      <CategoryNavbar />
      <div className='posts'>
        {/* {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))} */}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPostsByCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps, { getPostsByCategory })(
  React.memo(Posts),
);
