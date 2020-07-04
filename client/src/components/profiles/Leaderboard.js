import React, { Fragment, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getLeaderboard } from "../../actions/profile";

const Spinner = lazy(() => import("../layout/Spinner"));
const ProfileItem = lazy(() => import("./ProfileItem"));

const Profiles = ({ getLeaderboard, profile: { profiles, loading } }) => {
  useEffect(() => {
    getLeaderboard();
  }, [getLeaderboard]);

  return (
    <Fragment>
      {loading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Spinner />
        </Suspense>
      ) : (
        <Fragment>
          <h1 className='large dev-heading'>Leaderboard</h1>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfileItem
                    key={profile._id}
                    profile={profile}
                    from='leaderboard'
                  />
                </Suspense>
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getLeaderboard: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getLeaderboard })(
  React.memo(Profiles),
);
