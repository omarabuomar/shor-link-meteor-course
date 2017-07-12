import {Meteor} from 'meteor/meteor';
import React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import Signup from './../ui/Signup';
import Links from './../ui/Link';
import NotFound from './../ui/NotFound';
import Login from './../ui/Login';

const unauthenticatedPages=['/','/signup'];
const authenticatedPages=['/links'];
const onEnterPublicPage=()=>{
  if(Meteor.userId()){
    browserHistory.replace('/links');
  }
};

const OnEnterPrivatePage=()=>{
  if(!Meteor.userId()){
    browserHistory.replace('/');
  }
};

export const onAuthChange=(isAuthenticated)=>{
  const pathname=browserHistory.getCurrentLocation().pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPages = authenticatedPages.includes(pathname);

  if(isUnauthenticatedPage && isAuthenticated){
    browserHistory.replace('/links');
  }
  if(isAuthenticatedPages && !isAuthenticated){
    browserHistory.replace('/');
  }

  // console.log('isAuthenticated',isAuthenticated);
}

export const routes = (
  <Router history={browserHistory}>
    <Route path="/" component={Login} onEnter={onEnterPublicPage}/>
    <Route path="/signup" component={Signup} onEnter={onEnterPublicPage}/>
    <Route path="/links" component={Links} onEnter={OnEnterPrivatePage}/>
    <Route path="*" component={NotFound}/>
  </Router>
);
