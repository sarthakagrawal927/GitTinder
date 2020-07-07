import React from "react";

const Features = () => (
  <React.Fragment>
    <h2>Planned Products & Features</h2>
    <div className='row'>
      <div className='features-column col-lg-6'>
        <div className='card'>
          <div className='card-header'>
            <h3>GitTinder</h3>
          </div>
          <div className='card-body'>
            <p>Global Chat</p>
            <p>Bot as Guide</p>
            <p>CNN Recommender</p>
            <p>Poll Creation</p>
          </div>
        </div>
      </div>
      <div className='features-column col-lg-6 col-md-6'>
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
      <div className='features-column col-lg-6 col-md-6'>
        <div className='card'>
          <div className='card-header'>
            <h3>CollegePedia</h3>
          </div>
          <div className='card-body'>
            <p>Social Media</p>
            <p>If College Clubs</p>
            <p>Were a Person</p>
          </div>
        </div>
      </div>
      <div className='features-column col-lg-6'>
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
  </React.Fragment>
);

export default React.memo(Features);
