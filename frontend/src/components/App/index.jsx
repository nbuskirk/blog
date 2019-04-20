import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Home } from '../../components';

const App = (props) => {
	return (
		<div>nav here
		<Switch>
			
			<Route exact path="/home" component={Home} />
		</Switch>
		</div>
	);
}

export default App;