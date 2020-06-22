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
            content: "GitTinder GitHub Tinder DevConnector",
          },
          {
            property: "og:image",
            content: "http://example.com/article.jpg",
          },
          { property: "og:url", content: "http://gittinder.herokuapp.com" },
          { property: "og:type", content: "social-media" },
          {
            name: "keywords",
            content:
              "GitHub Tinder GitTinder social-media hub developers connect",
          },
          {
            name: "author",
            content: "Sarthak Agrawal Significant Hobbies GitTinder",
          },
          {
            name: "google-site-verification",
            content: "pyKM-6DhxSOA_-VpK-7RIaCk4W8OAi3w5MBzLm05lwA",
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
