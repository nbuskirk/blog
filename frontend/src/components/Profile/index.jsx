import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Profile extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){
		/* If we aren't logged in, redirect to the homepage, preventing this route from being accessed directly */
		if(!this.props.user) {
			this.props.history.push('/')
		}
	}

	render() {

		const { user } = this.props;

		return (
			<div id='profile'>
				<div className='container'>
					<div className='mx-auto card p-5 text-center'>
						{user ? 
							<div>
								<h1>{user.username}</h1>
								<p>{user.createdAt}</p>
							</div>
							: null}
						<hr/>
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

export default withRouter(connect(mapStateToProps, null)(Profile));