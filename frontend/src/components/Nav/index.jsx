import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(event) {
		/* When we click logout, reduce our state by user, and redirect */
		const { onLogout } = this.props;
		event.preventDefault();
		onLogout(); // call reducer
		this.props.history.push('/'); //redirect
	}

	render(){

		/* Show some conditional links based on whether or not we have a user logged in */
		const { user } = this.props;

		return(
			<div className='navbar navbar-expand-lg navbar-dark bg-dark'>
				<div className='container'>
					<NavLink to='/' className='navbar-brand'>BLOG</NavLink>
					<button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarContent' aria-controls='navbarText' aria-expanded='false' aria-label='Toggle Navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div className='collapse navbar-collapse' id='navbarContent'>
						<ul className='navbar-nav mr-auto'>
							<li className='nav-item'>
								<NavLink exact={true} to='/' className='nav-link'>Home</NavLink>
							</li>
							<li className='nav-item'>
								<NavLink to='/blog' className='nav-link'>Blog</NavLink>
							</li>		
						</ul>
					
						{ user ? 	
							<ul className='navbar-nav'>	
								<li className="nav-item"><NavLink to='/profile' className='nav-link'>Profile</NavLink></li>
								<li className="nav-item"><a href="#" className='nav-link' onClick={this.handleLogout}>Logout</a></li>
							</ul>
						: 	<ul className='navbar-nav'>
								<li className='nav-item'><NavLink to='/login' className='nav-link'>Login</NavLink></li>
								<li className='nav-item'><NavLink to='/signup' className='nav-link'>Sign Up</NavLink></li>
							</ul>
						}
					</div>
				</div>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	onLogout: id => dispatch({ type: 'USER_LOGOUT', id})
})

export default withRouter(connect(null, mapDispatchToProps)(Nav));