import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Blog } from '../../components';
import { Nav } from '../../components';
import { Home } from '../../components';
import { Users } from '../../components';


const App = (props) => {
	return (
		<div id='appWrapper'>
		<Nav />
		<Switch>
			<Route exact path="/" component={ Home } />
			<Route path="/blog" component={ Blog } />
			<Route path="/users" component={ Users } />
			
		</Switch>
		</div>
	);
}

export default App;