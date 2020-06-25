import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const Categories = [
    { category: "All", Link: "/posts" },
    { category: "Web Development", Link: "/posts/categories/web-development" },
    {
      category: "Mobile Software Dev",
      Link: "/posts/categories/mobile-development",
    },
    { category: "Development", Link: "/posts/categories/development" },
  ];

  const authLinks = Categories.map((topic) => (
    <li key={topic.category}>
      <Link className='nav-link' to={topic.Link}>
        <span>{topic.category}</span>
      </Link>
    </li>
  ));

  return (
    <nav className='navbar bg-dark navbar-dark'>
      {!loading && (
        <Fragment>
          <ul>{authLinks}</ul>
        </Fragment>
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

export default connect(mapStateToProps, { logout })(Navbar);
