import React, { Fragment } from "react";
import Footer from "./Footer";
// import { Link } from "react-router-dom";

const aboutus = () => {
  return (
    <Fragment>
      <h1>
        CSS in progress, you can help us contact significanthobbies@gmail.com
      </h1>
      <section id='pricing'>
        <h2>Upcoming Features</h2>
        <p>
          Simple and FREE platform to connect with other fellow coders to
          unleash your creativity.
        </p>
        <div class='row'>
          <div class='pricing-column col-lg-4 col-md-6'>
            <div class='card'>
              <div class='card-header'>
                <h3>&#60; Find Your Buddy /&#62;</h3>
              </div>
              <div class='card-body'>
                <h2>#BuddyNextDoor</h2>
                <p>Upto 5 Team-ups/Day</p>
                <p>Upto 10 Messages/Day</p>
                <p>Unlimited App Usage</p>
                <button
                  class='btn btn-outline-dark btn-lg btn-block'
                  type='button'>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div class='pricing-column col-lg-4 col-md-6'>
            <div class='card'>
              <div class='card-header'>
                <h3>Code Together</h3>
              </div>
              <div class='card-body'>
                <h2>#EverythingBuilt-In</h2>
                <p>Compiler & Editor</p>
                <p>Unique Chat Options</p>
                <p>Send Anything!</p>
                <button
                  class='btn btn-outline-dark btn-lg btn-block'
                  type='button'>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div class='pricing-column col-lg-4'>
            <div class='card'>
              <div class='card-header'>
                <h3>Create A Team</h3>
              </div>
              <div class='card-body'>
                <h2>#SquadGoalsTogether</h2>
                <p>Group Chat Available</p>
                <p>Broadcast Messages</p>
                <p>Task Management Features</p>
                <button
                  class='btn btn-outline-dark btn-lg btn-block'
                  type='button'>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='testimonials'>
        <div id='testimonial-carousel' class='carousel slide' data-ride='false'>
          <div class='carousel-inner'>
            <div class='carousel-item active'>
              <h2>
                You no longer have to keep looking around for a partener to code
                with.There are a lot of coders here to team up with.
              </h2>
              <img
                class='testimonial-image'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzC9u-F7-Qb-JQeEo2X0CpgFQ2YyuSOGnGSWfQtSvEKfIQpAL9&usqp=CAU'
                alt='dog-profile'
              />
              <em>Sarthak Agarwal</em>
            </div>
            <div class='carousel-item'>
              <h2 class='testimonial-text'>
                I was tired of looking for someone to partener with on my
                project but when I landed here,there were alot of coders looking
                for teaming up.
              </h2>
              <img
                class='testimonial-image'
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQzC9u-F7-Qb-JQeEo2X0CpgFQ2YyuSOGnGSWfQtSvEKfIQpAL9&usqp=CAU'
                alt='lady-profile'
              />
              <em>A random girl</em>
            </div>
          </div>
          <a
            class='carousel-control-prev'
            href='#testimonial-carousel'
            role='button'
            data-slide='prev'>
            <span class='carousel-control-prev-icon'></span>
          </a>
          <a
            class='carousel-control-next'
            href='#testimonial-carousel'
            role='button'
            data-slide='next'>
            <span class='carousel-control-next-icon'></span>
          </a>
        </div>
      </section>

      <Footer />
    </Fragment>
  );
};

export default aboutus;
