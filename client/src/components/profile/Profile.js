import React, { Fragment, useEffect, lazy, Suspense } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getProfileById } from "../../actions/profile";

const ProfileTop = lazy(() => import("./ProfileTop"));
const ProfileAbout = lazy(() => import("./ProfileAbout"));
const ProfileExperience = lazy(() => import("./ProfileExperience"));
const ProfileEducation = lazy(() => import("./ProfileEducation"));
const ProfilePosts = lazy(() => import("./ProfilePosts"));
const Spinner = lazy(() => import("../layout/Spinner"));

const Profile = ({ getProfileById, profile: { profile }, auth, match }) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <Fragment>
      {profile === null ? (
        <Suspense fallback={<div>loading.</div>}>
          <Spinner />
        </Suspense>
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn btn-light'>
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-dark'>
                Edit Profile
              </Link>
            )}
          <div className='profile-grid my-1'>
            <Suspense fallback={<div>loading.</div>}>
              <ProfileTop profile={profile} />
            </Suspense>

            <Suspense fallback={<div>loading.</div>}>
              <ProfileAbout profile={profile} />
            </Suspense>

            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <Suspense fallback={<div>loading.</div>}>
                      {" "}
                      <ProfileExperience
                        key={experience._id}
                        experience={experience}
                      />
                    </Suspense>
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <Suspense fallback={<div>loading.</div>}>
                      {" "}
                      <ProfileEducation
                        key={education._id}
                        education={education}
                      />
                    </Suspense>
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
          </div>

          {profile && (
            <Suspense fallback={<div>loading.</div>}>
              <ProfilePosts userID={match.params.id} />
            </Suspense>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(
  React.memo(Profile),
);
