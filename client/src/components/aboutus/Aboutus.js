import React from "react";
import loadable from "@loadable/component";

import { Link } from "react-router-dom";
const Emoji = loadable(() => import("../layout/Emoji"));
const Footer = loadable(() => import("../layout/Footer"));
const Features = loadable(() => import("./Features"));
const AboutGit = loadable(() => import("./AboutGit"));
const AboutSH = loadable(() => import("./AboutSH"));

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

      <Features />
      <AboutGit />

      <br />
      <AboutSH />
      <br />
      <h4>
        For more information we have a{" "}
        <Link to='/conversationform'>Small Chat Bot</Link>
      </h4>

      <Footer />
    </div>
  );
};

export default aboutus;
