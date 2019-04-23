import React from 'react';
import { connect } from 'react-redux'

class Home extends React.Component {

	render(){

		const { user } = this.props;
		
		return (
			<div id='home'>
				<div className='container'>
					<div className='mx-auto card p-5 text-center'>
						<h1>Home</h1>
						{user ? 'Welcome, '+user.username : 'You are not currently logged in'}
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