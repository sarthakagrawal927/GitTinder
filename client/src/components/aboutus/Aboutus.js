import React, { lazy, Suspense } from "react";
import LazyLoad from "react-lazyload";
import logo from "../../img/git_logo.webp";
const Emoji = lazy(() => import("../layout/Emoji"));
const Footer = lazy(() => import("./Footer"));
const Features = lazy(() => import("./Features"));
const AboutGit = lazy(() => import("./AboutGit"));
const AboutSH = lazy(() => import("./AboutSH"));

const aboutus = () => {
  return (
    <div className='aboutus'>
      <div className='row'>
        <div
          className='col-6'
          style={({ padding: "3rem" }, { alignSelf: "center" })}>
          <h2>
            Work in progress
            <Suspense fallback={<div>.</div>}>
              <Emoji symbol='💡' label='bulb' />{" "}
            </Suspense>
          </h2>
          <h3>
            Open Source
            <Suspense fallback={<div>.</div>}>
              <Emoji symbol='😀' label='smiley face' />
            </Suspense>
          </h3>
          <p>
            This is a platform to connect with developers to learn and build
            products
          </p>

          <h4>We are Recruiting right now !</h4>
        </div>
        <div className='col-6' style={{ textAlign: "center" }}>
          {" "}
          <LazyLoad once='true'>
            <img
              src={logo}
              alt='gittinderlogo'
              style={({ height: "30vh" }, { width: "20vw" })}
            />
          </LazyLoad>
        </div>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <section id='features'>
          <Features />
        </section>
      </Suspense>
      <section id='about'>
        <Suspense fallback={<div>Loading...</div>}>
          <AboutGit />

          <br />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <AboutSH />
        </Suspense>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default React.memo(aboutus);
