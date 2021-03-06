import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import ProfileForm from "../profile-forms/ProfileForm";
import AddExperience from "../profile-forms/AddExperience";
import AddEducation from "../profile-forms/AddEducation";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import Posts from "../posts/Posts";
import CategoryPosts from "../posts/CategoryPosts";

import Post from "../post/Post";
import NotFound from "../layout/NotFound";
import PrivateRoute from "../routing/PrivateRoute";
import AboutUs from "../aboutus/Aboutus";
import Leaderboard from "../profiles/Leaderboard";

const Routes = (props) => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/aboutus' component={AboutUs} />
        <Route exact path='/leaderboard' component={Leaderboard} />

        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={ProfileForm} />
        <PrivateRoute exact path='/edit-profile' component={ProfileForm} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute
          path='/posts/categories/:category'
          component={CategoryPosts}
        />

        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
