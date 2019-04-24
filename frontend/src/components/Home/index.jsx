import React from 'react';
import { connect } from 'react-redux'
import {NavLink} from 'react-router-dom';

class Home extends React.Component {

	render(){

		const { user } = this.props;
		
		return (
			<div id='home'>
				<div className='container'>
					<div className='mx-auto card p-5 text-center'>
						<h1>Welcome</h1>
						<hr/>
						{user ? 'Welcome back, '+user.username : <div><p>You are not currently logged in</p><p>Please <NavLink to='/login'>click here</NavLink> to login or <NavLink to='/signup'>click here</NavLink> to create an account</p></div>}
					</div>
				</div>
			</div>
		)
	}
}

/* Get user from global store and map it to a property */
const mapStateToProps = state => ({
	user: state.app.user
})

export default connect(mapStateToProps, null)(Home);