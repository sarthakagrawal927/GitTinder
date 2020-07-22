import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Routes from "./components/routing/Routes";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.scss";
import { Helmet } from "react-helmet";

import TagManager from "react-gtm-module";

const tagManagerArgs = {
  gtmId: "GTM-PTMC9RW",
};

TagManager.initialize(tagManagerArgs);

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <div>
      <Helmet
        title='GitTinder'
        meta={[
          {
            name: "theme-color",
            content: "#317EFB",
          },
          {
            name: "description",
            content:
              "GitTinder is a social networking and online developer meeting application/website that allows users to connect with similar minds",
          },
          {
            property: "og:description",
            content:
              "GitTinder is a social networking and online developer meeting application/website that allows users to connect with similar minds",
          },
          {
            property: "og:title",
            content: "GitTinder GitHub+Tinder Where Developers Meet",
          },
          {
            property: "og:image",
            content:
              "https://significant.s3.amazonaws.com/significanthobbies-1592919043997.png",
          },
          { property: "og:url", content: "http://gittinder.herokuapp.com" },
          { property: "og:type", content: "social-media developers" },
          {
            name: "keywords",
            content:
              "GitHub Tinder GitTinder social-media hub developers connect significant hobbies significanthobbies",
          },
          {
            name: "author",
            content: "SignificantHobbies GitTinder Significant Hobbies",
          },
        ]}
      />
      <Provider store={store}>
        <Router>
          <Fragment>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
