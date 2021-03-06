import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router';

import Requester from './services/requester';
import AppState from './state';

import MainView from './views/main';
import ListView from './views/list';
import CreateView from './views/create';
import ShowView from './views/show'
import LoginView from './views/login';


const routes = (
  <Route path="/" component={MainView}>
    <IndexRoute name="dashboard" component={ListView} />
    <Route name="login" path="login" component={LoginView} />
    <Route name="create" path="create/:typ" component={CreateView} />
    <Route name="show" path="show/:typ/:id" component={ShowView} />
  </Route>
);

const requester = new Requester();
const appState = new AppState(requester);

var _createElement = function (Component, props) {
  return <Component {...props} state={appState} />
};

const mountpoint = document.getElementById('my-app');
const router = (
  <Router history={browserHistory} createElement={_createElement}>
    {routes}
  </Router>
);
render(router, mountpoint);
