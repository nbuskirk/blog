/*

	App Container
		data props - user (null/json object)

	PROTIP: Treat React as a view layer ONLY. They should just view the data they are passed, functions and operations
			on that data come from the redux store reducers.

*/

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

/* Import components used in App */
import { Blog } from '../../components';
import { Nav } from '../../components';
import { Home } from '../../components';
import { Signup } from '../../components';
import { Login } from '../../components';

/* App Component */
class App extends React.Component {

	componentDidMount() {
		/* When the App is loaded, check localStorage to see if a user object exists */
		const { onLoad } = this.props;
		let user = JSON.parse(localStorage.getItem('user'));
		if(user == undefined) user = null;
		
		/* Once we check localStorage, call redux onLoad method with data of user */
		/* This will set the user prop on App, which can be checked/used in all routes */
		onLoad(user);
	}

	render() {

		/* Grab our user property */
		const { user } = this.props;

		/* Send user to all the following <Route />'s */
		return (
			<div id='appWrapper'>
			<Nav user={user}  />
			<Switch>
				<Route exact path="/" component={ Home } user={user} />
				<Route path="/blog" component={ Blog } user={user} />
				<Route exact path="/signup" component={ Signup } user={user} />
				<Route exact path="/login" component={ Login } />
			</Switch>
			<footer id="footer">
				<p className='text-center'>Test blog (c) 2019 nbuskirk</p>
				{ user ? <p className='text-center'>You are currently logged in as: {user.username}</p> : null }
			</footer>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.app.user
});
const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'APP_LOADED', data }),
	onLogout: id => dispatch({ type: 'USER_LOGOUT', id})
});

/* MapStateToProps (Reducer -> Here -> Re-Render) will take the data returned from the reducer, and cascade those properties to this component */
/* MapDispatchToProps (Here -> Reducer) will map these action types as methods to this component so they can be called to pass in data to the reducer */
/* Connect will connect this component to our global store so we can access the reducers */
/* As the store is global, try to keep the naming convention MODEL_ACTION_ETC */
export default connect(mapStateToProps, mapDispatchToProps)(App);