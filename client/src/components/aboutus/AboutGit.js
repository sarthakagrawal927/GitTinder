import React from "react";

const AboutGit = () => (
  <section id='about'>
    <h2>About GitTinder</h2>
    <div className='row'>
      <div className='col-lg-4 why'>
        <h3>Why ?</h3>
      </div>
      <div className='col-lg-8 reason'>
        <p>
          GitTinder aims to help various developers connect with each other so
          that they can collaborate in projects and find accountability partners
          for rapid learning. To get updates regarding the progress join the{" "}
          <a href='https://chat.whatsapp.com/HTW5WVJIPD42ACIL2z2pXu'>
            Whatsapp Group
          </a>
        </p>
      </div>

      <div className='col-lg-4 why'>
        <h3>What to expect ?</h3>
      </div>
      <div className='col-lg-8 reason'>
        <p>
          Here you can add your project idea and interested developers can reach
          out to you through Social Media provided by you.
          <br />
          If you are feeling lazy about starting some course, you can post about
          it and it is likely someone else is also being conscious about their
          choice. Then you can connect with each other and become accountability
          partners. For more info regarding{" "}
          <a href='https://www.publishingpulse.com/accountability-partner-personal-accountability-goals/'>
            accountability{" "}
          </a>{" "}
          .
        </p>
      </div>

      <div className='col-lg-4 why'>
        <h3>Why not use Github ?</h3>
      </div>
      <div className='col-lg-8 reason'>
        <p>
          Github has its own merits , finding projects in early stages is not
          one of them.
          <br />
          Technically you can, but it's too difficult to find projects in
          starting stage on Github. GitTinder aims to allow users to connect
          during the ideation period. And also you can start courses together
          and help each other progress faster.
        </p>
      </div>
    </div>
  </section>
);

export default AboutGit;
