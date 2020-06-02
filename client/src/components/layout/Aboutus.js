import React, { Fragment } from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "./../css/aboutus.css";

const aboutus = () => {
  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-6'>
            <h1 className='big-heading'>Are you looking for a partner?</h1>
            <p>My work shows for itself that I'm bad at CSS</p>
            <p>For this website I followed a course , so not a big deal.</p>
            <Link
              className='nav-link btn btn-outline-dark btn-lg'
              to='/register'>
              Register
            </Link>
            <Link className='nav-link btn btn-outline-dark btn-lg' to='/login'>
              Log In
            </Link>
          </div>

          <div className='col-lg-6'>image</div>
        </div>
      </div>

      <Footer />
    </Fragment>
  );
};

export default aboutus;
