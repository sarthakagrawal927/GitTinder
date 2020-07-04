import React, { lazy, Suspense } from "react";
import { Link } from "react-router-dom";

const Emoji = lazy(() => import("../layout/Emoji"));
const Footer = lazy(() => import("./Footer"));
const Features = lazy(() => import("./Features"));
const AboutGit = lazy(() => import("./AboutGit"));
const AboutSH = lazy(() => import("./AboutSH"));

const aboutus = () => {
  return (
    <div className='aboutus'>
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
          <br />
          <h4>
            For more information we have a{" "}
            <Link to='/conversationform'>Small Chat Bot</Link>
          </h4>
        </Suspense>
      </section>

      <Suspense fallback={<div>Loading...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default React.memo(aboutus);
