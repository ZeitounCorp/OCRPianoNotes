import React from 'react';
// Mount is used to render pages
import { mount } from 'react-mounter';
// Router implementation modules
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

// Not Found Page
import NotFound from './pages/NotFound';
 

// Importing Layouts
import NoLayout from './layouts/NoLayout';
import LoggedInLayout from './layouts/LoggedInLayout';

// Importing the pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Files from './pages/Files';
import Scan from './pages/Scan';
import Future from './pages/Future';
// Importing firebase dependency in order to initialize the app
import firebase from 'firebase/app';
import 'firebase/auth';

function route_login(props) {
  firebase.auth().onAuthStateChanged((user_) => {
    if (user_) {
      redirect_dash(props);
    } else {
      return (
        mount(NoLayout, { content: <Login {...props} />, ...props })
      );
    }
  });
}

function default_not_found(props) {
  firebase.auth().onAuthStateChanged(async (user_) => {
    if (user_) {
      return (
        mount(LoggedInLayout, { content: <NotFound {...props} />, ...props })
      );
    } else {
      return (
        mount(NoLayout, { content: <NotFound {...props} />, ...props })
      );
    }
  });
}

function routes_protected_by_auth(props, COMPONENT) {
  firebase.auth().onAuthStateChanged(async (user_) => {
    if (user_) {
      return (
        mount(LoggedInLayout, { content: <COMPONENT {...props} />, ...props })
      );
    } else {
      redirect_login(props);
    }
  });
}

function redirect_login(props) {
  props.history.replace('/login');
}

function redirect_dash(props) {
  props.history.replace('/dashboard');
}

function root_path_redirect(props) {
  firebase.auth().onAuthStateChanged((user_) => {
    if (user_) {
      localStorage.setItem('user_uid', user_.uid);
      localStorage.setItem('user_email', user_.email);
      props.history.replace('/dashboard');
    } else {
      redirect_login(props);
    }
  });
}

const DefaultRouter = (
  <Router >
    <Switch>
      <Route exact path="/" render={(props) => root_path_redirect(props)} />
      <Route exact path="/login" render={(props) => route_login(props)} />
      <Route exact path="/dashboard" render={(props) => routes_protected_by_auth(props, Dashboard)} />
      <Route exact path="/scan" render={(props) => routes_protected_by_auth(props, Scan)} />
      <Route exact path="/future" render={(props) => routes_protected_by_auth(props, Future)} />
      <Route exact path="/files" render={(props) => routes_protected_by_auth(props, Files)} />
      <Route render={(props) => default_not_found(props)} />
    </Switch>
  </Router>
);

export default DefaultRouter
