import React, { Fragment, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";

const DashboardActions = lazy(() => import("./DashboardActions"));
const Experience = lazy(() => import("./Experience"));
const Education = lazy(() => import("./Education"));
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className='large text-primary'>Personal Information</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <Suspense fallback={<div>Loading...</div>}>
            <DashboardActions />
          </Suspense>

          <Suspense fallback={<div>Loading...</div>}>
            <Experience experience={profile.experience} />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            {" "}
            <Education education={profile.education} />
          </Suspense>

          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i class='fas fa-trash-alt'></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  React.memo(Dashboard),
);
