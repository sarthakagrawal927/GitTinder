import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link className='nav-link' to='/profiles'>
          <i className='fas fa-globe'></i>{" "}
          <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/posts'>
          Posts
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/aboutus'>
          About Us
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/leaderboard'>
          Leaderboard
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/dashboard'>
          <i className='fas fa-user' />{" "}
          <span className='hide-sm'>Profile Info</span>
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/aboutus'>
          <i className='fas fa-sign-out-alt' />{" "}
          <span className='hide-sm'>Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link className='nav-link' to='/leaderboard'>
          Leaderboard
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/aboutus'>
          About Us
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/register'>
          Register
        </Link>
      </li>
      <li>
        <Link className='nav-link' to='/login'>
          Login
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark navbar-dark'>
      <h1>
        <Link className='navbar-brand' to='/'>
          <i className='fas fa-code' /> GitTinder
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(React.memo(Navbar));
