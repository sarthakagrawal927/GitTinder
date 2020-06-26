import React from "react";

const Features = () => (
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
);

export default Features;
