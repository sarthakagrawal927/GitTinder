import React, { Fragment } from "react";

const Footer = () => {
  return (
    <Fragment>
      {" "}
      <footer className='colored-section' id='footer'>
        <div className='col-lg-12'>
          <div className='container-fluid'>
            <a href='https://www.instagram.com/significant_hobbies/'>
              <i className='social-icon fab fa-instagram'></i>
            </a>

            <a href='https://www.linkedin.com/company/significanthobbies/'>
              <i className='social-icon fab fa-linkedin'></i>
            </a>

            <a href='mailto:significanthobbies@gmail.com' target='_top'>
              {" "}
              <i className='social-icon fas fa-envelope'></i>
            </a>
            <p>© 2020 SignificantHobbies</p>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default React.memo(Footer);
