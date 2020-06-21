import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";
const aboutus = () => {
  return (
    <div className='aboutus'>
      <h3>
        CSS in progress, you can help us contact: <br />
        <br />
        <a href='mailto:significanthobbies@gmail.com'>
          significanthobbies@gmail.com
        </a>
      </h3>
      <p>
        This is platform to connect with developers to learn and build products
      </p>
      <section id='pricing'>
        <h2>Planned Products & Features</h2>
        <div class='row'>
          <div class='pricing-column col-lg-6'>
            <div class='card'>
              <div class='card-header'>
                <h3>GitTinder</h3>
              </div>
              <div class='card-body'>
                <p>Global Chat</p>
                <p>Bot as Guide</p>
                <p>Neural Network Recommender</p>
                <p>Team-Management Features</p>
              </div>
            </div>
          </div>
          <div class='pricing-column col-lg-6 col-md-6'>
            <div class='card'>
              <div class='card-header'>
                <h3>Memenza </h3>
              </div>
              <div class='card-body'>
                <p>Ultimate Meme Showdown</p>
                <p>Memes by Category</p>
                <p>AI generated Memes</p>
                <p>LeaderBoard</p>
              </div>
            </div>
          </div>
          <div class='pricing-column col-lg-6 col-md-6'>
            <div class='card'>
              <div class='card-header'>
                <h3>FlashSurvey</h3>
              </div>
              <div class='card-body'>
                <p>Google Form RipOff</p>
                <p>Stylable</p>
                <p>Mailer Integration</p>
              </div>
            </div>
          </div>
          <div class='pricing-column col-lg-6'>
            <div class='card'>
              <div class='card-header'>
                <h3>Blog</h3>
              </div>
              <div class='card-body'>
                <p>Newsletter</p>
                <p>Tools for enhanced writing experience</p>
                <p>Multiple Channels</p>
              </div>
            </div>
          </div>
        </div>
        <h4>
          For more Info <Link to='/conversationform'> Click Here</Link>
        </h4>
      </section>

      <Footer />
    </div>
  );
};

export default aboutus;
