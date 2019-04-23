/*
	App entry point
	One global store provided to <App />
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, HashRouter } from 'react-router-dom';
import store from './store';

import { App } from './components'
import '../resources/scss/style.scss';

ReactDOM.render(
  <HashRouter basename="/">
  	<Provider store={store}>
	  	<Switch>
	  		<Route path='/' component={App} />
	  	</Switch>
  	</Provider>
  </HashRouter>,
  document.getElementById('root'),
);