import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Blog } from '../../components';
import { Nav } from '../../components';
import { Home } from '../../components';
import { Users } from '../../components';
import { Login } from '../../components';

class App extends React.Component {

	componentDidMount() {
		const { onLoad } = this.props;
		let user = JSON.parse(localStorage.getItem('user'));
		if(user == undefined) user = null;
		//console.log(user)
		onLoad(user);
	}

	render() {

		const { user } = this.props;

		return (
			<div id='appWrapper'>
			<Nav user={user}  />
			<Switch>
				<Route exact path="/" component={ Home } user={user} />
				<Route path="/blog" component={ Blog } user={user} />
				<Route path="/users" component={ Users } user={user} />
				<Route exact path="/login" component={ Login } />

			</Switch>
			<footer id="footer">
				<p className='my-4 text-center'>Test blog (c) 2019 nbuskirk</p>
			</footer>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.app.user
})
const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'APP_LOADED', data }),
	onLogout: id => dispatch({ type: 'USER_LOGOUT', id})
})
export default connect(mapStateToProps, mapDispatchToProps)(App);