import React, { Fragment } from "react";

const aboutus = () => {
  return (
    <Fragment>
      {" "}
      <footer className='colored-section' id='footer'>
        <div className='row'>
          <div className='col-lg-6'>
            <div className='container-fluid'>
              <a href='https://www.instagram.com/significant_hobbies/'>
                <i className='social-icon fab fa-instagram'></i>
              </a>
              {/* <i className='social-icon fab fa-facebook-f'></i> */}

              <a href='https://www.linkedin.com/company/significanthobbies/'>
                <i className='social-icon fab fa-linkedin'></i>
              </a>

              <a href='mailto:significanthobbies@gmail.com' target='_top'>
                {" "}
                <i className='fas fa-envelope'></i>
              </a>
              <p>© 2020 SignificantHobbies</p>
            </div>
          </div>

          <div className='col-lg-6'>
            <div className='container-fluid'>
              <h3>Contact Us !</h3>
              <p>
                <a href='mailto:significanthobbies@gmail.com' target='_top'>
                  {" "}
                  <i className='fas fa-envelope'></i>{" "}
                  significanthobbies@gmail.com
                </a>
              </p>
              <p>
                <i className='fas fa-phone'></i> Call us at (don't)
              </p>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default aboutus;
