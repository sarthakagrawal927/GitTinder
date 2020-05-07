import React, { Fragment } from "react";

const aboutus = () => {
  return (
    <Fragment>
      {" "}
      <div className='row'>
        <div className='col-lg-6'>
          <footer className='colored-section' id='footer'>
            <div className='container-fluid'>
              <i className='social-icon fab fa-facebook-f'></i>
              <i className='social-icon fab fa-twitter'></i>
              <i className='social-icon fab fa-instagram'></i>
              <i className='social-icon fas fa-envelope'></i>
              <p>© 2020 GitTinder</p>
            </div>
          </footer>
        </div>

        <div className='col-lg-6'>
          <footer className='colored-section' id='footer'>
            <div className='container-fluid'>
              <h3>Contact Us !</h3>
              <p>
                <i className='fas fa-envelope'></i> significanthobbies@gmail.com
              </p>
              <p>
                <i className='fas fa-phone'></i> Call us at (don't)
              </p>
            </div>
          </footer>
        </div>
      </div>
    </Fragment>
  );
};

export default aboutus;
