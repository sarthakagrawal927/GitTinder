import React, { Fragment, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getProfiles } from "../../actions/profile";

const Spinner = lazy(() => import("../layout/Spinner"));
const ProfileItem = lazy(() => import("./ProfileItem"));

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      {loading ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Spinner />
        </Suspense>
      ) : (
        <Fragment>
          <h1 className='large dev-heading'>Developers</h1>
          <p className='lead'>Connect with your fellow Developers</p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <Suspense fallback={<div>Loading...</div>}>
                  <ProfileItem
                    key={profile._id}
                    profile={profile}
                    from='developers'
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
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(React.memo(Profiles));
