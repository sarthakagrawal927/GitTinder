import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import male_image from "../../img/male.png";
import female_image from "../../img/female.png";

const ProfileItem = ({
  profile: {
    user: { _id, name },
    displayPictureURL,
    gender,
    status,
    company,
    location,
    skills,
    likes,
    numberOfPosts,
  },
  from,
}) => (
  <div className='profile'>
    <img
      src={displayPictureURL || (gender === "Male" ? male_image : female_image)}
      alt='DP'
      className='round-img'
    />
    <div>
      <h2>{name}</h2>
      <p>
        {status} {company && <span> at {company}</span>}
      </p>
      {from === "leaderboard" ? (
        <p className='my-1'>Likes : {likes}</p>
      ) : (
        <p className='my-1'>{location && <span>{location}</span>}</p>
      )}

      {from === "leaderboard" && (
        <p className='my-1'>Number of Posts : {numberOfPosts}</p>
      )}

      <Link to={`/profile/${_id}`} className='btn btn-primary'>
        View Profile
      </Link>
    </div>
    <ul>
      {skills.slice(0, 4).map((skill, index) => (
        <li key={index} className='text-primary'>
          <i className='fas fa-check' /> {skill}
        </li>
      ))}
    </ul>
  </div>
);

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
