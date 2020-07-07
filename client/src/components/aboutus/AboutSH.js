import React from "react";
import LazyLoad from "react-lazyload";
import Desc from "../../img/desc.webp";
const AboutSH = () => (
  <React.Fragment>
    <h2>SignificantHobbies - The Parent Company</h2>
    <div className='row'>
      <div className='col-lg-4 why'>
        <h3>Why ?</h3>
      </div>
      <div className='col-lg-8 reason'>
        <p>
          We at Significant Hobbies intend to create multiple websites with the
          aim to fill in the gaps left out by big companies. And learn to work
          with latest technologies in Web Development, Data Science and
          Designing.
        </p>
      </div>

      <div className='col-lg-4 why'>
        <h3>How can I join the organization ?</h3>
      </div>
      <div className='col-lg-8 reason'>
        <p>
          You are in luck ! We are currently recruiting for the following
          positions - Front-End Developer, Back-End Developer, Marketing,
          Finance, Public Relations and Designing. You can join by filling this{" "}
          <a href='https://forms.gle/YECXPm75V5Pa43VJ6'>form</a>. We will get
          back to you shortly !
        </p>
      </div>
    </div>
    <h2>More on Future Projects</h2>
    <br />
    <LazyLoad once='true'>
      <img src={Desc} alt='Description' />
    </LazyLoad>
  </React.Fragment>
);

export default React.memo(AboutSH);
