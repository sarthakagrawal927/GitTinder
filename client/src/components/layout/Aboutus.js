import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Emoji from "./Emoji";
const aboutus = () => {
  return (
    <div className='aboutus'>
      <h2>
        Work in progress <Emoji symbol='💡' label='bulb' />{" "}
      </h2>
      <h3>
        Open Source <Emoji symbol='😀' label='smiley face' />
      </h3>

      <p>
        This is a platform to connect with developers to learn and build
        products
      </p>

      <section id='pricing'>
        <h2>Planned Products & Features</h2>
        <div className='row'>
          <div className='pricing-column col-lg-6'>
            <div className='card'>
              <div className='card-header'>
                <h3>GitTinder</h3>
              </div>
              <div className='card-body'>
                <p>Global Chat</p>
                <p>Bot as Guide</p>
                <p>Neural Network Recommender</p>
                <p>Team-Management Features</p>
              </div>
            </div>
          </div>
          <div className='pricing-column col-lg-6 col-md-6'>
            <div className='card'>
              <div className='card-header'>
                <h3>Memenza </h3>
              </div>
              <div className='card-body'>
                <p>Ultimate Meme Showdown</p>
                <p>Memes by Category</p>
                <p>AI generated Memes</p>
                <p>LeaderBoard</p>
              </div>
            </div>
          </div>
          <div className='pricing-column col-lg-6 col-md-6'>
            <div className='card'>
              <div className='card-header'>
                <h3>FlashSurvey</h3>
              </div>
              <div className='card-body'>
                <p>Google Form RipOff</p>
                <p>Stylable</p>
                <p>Mailer Integration</p>
              </div>
            </div>
          </div>
          <div className='pricing-column col-lg-6'>
            <div className='card'>
              <div className='card-header'>
                <h3>Blog</h3>
              </div>
              <div className='card-body'>
                <p>Newsletter</p>
                <p>Tools for enhanced writing experience</p>
                <p>Multiple Channels</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='about'>
        <h2>About GitTinder</h2>
        <div className='row'>
          <div className='col-lg-4 why'>
            <h3>Why ?</h3>
          </div>
          <div className='col-lg-8 reason'>
            <p>
              GitTinder aims to help various developers connect with each other
              so that they can collaborate in projects and find accountability
              partners for rapid learning.
            </p>
          </div>

          <div className='col-lg-4 why'>
            <h3>What to expect ?</h3>
          </div>
          <div className='col-lg-8 reason'>
            <p>
              Here you can add your project idea and interested developers can
              reach out to you through Social Media provided by you.
              <br />
              If you are feeling lazy about starting some course, you can post
              about it and it is likely someone else is also being conscious
              about their choice. Then you can connect with each other and
              become accountability partners. For more info{" "}
              <a href='https://www.publishingpulse.com/accountability-partner-personal-accountability-goals/'>
                click here
              </a>{" "}
              .
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <section id='about'>
        <h2>SignificantHobbies - The Parent Company</h2>
        <div className='row'>
          <div className='col-lg-4 why'>
            <h3>Why ?</h3>
          </div>
          <div className='col-lg-8 reason'>
            <p>
              We at Significant Hobbies intend to create multiple websites with
              the aim to fill in the gaps left out by big companies. And learn
              to work with latest technologies in Web Development, Data Science
              and Designing.
            </p>
          </div>

          <div className='col-lg-4 why'>
            <h3>How can I join the organization ?</h3>
          </div>
          <div className='col-lg-8 reason'>
            <p>
              You are in luck ! We are currently recruiting for the following
              positions - Front-End Developer, Back-End Developer, Marketing,
              Finance, Public Relations and Designing. You can join by filling
              this <a href='https://forms.gle/YECXPm75V5Pa43VJ6'>form</a>. We
              will get back to you shortly !
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
      <h4>
        For more Info <Link to='/conversationform'> Click Here</Link>
      </h4>

      <Footer />
    </div>
  );
};

export default aboutus;
