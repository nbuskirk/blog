import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends React.Component {

	constructor(props) {
		super(props);

		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout(event) {
		console.log('logout');
		const {onLogout} = this.props;
		event.preventDefault();
		onLogout();
		this.props.history.push('/');
	}

	render(){

		const { user } = this.props;
		console.log(user)

		return(
			<div className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container'>
				<NavLink to='/' className='navbar-brand'>Test Blog</NavLink>
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
						 
							 <li className='nav-item'>
								<NavLink to='/users' className='nav-link'>Users</NavLink>
								</li>
							
						
					</ul>
					<ul className='navbar-nav'>	
						{ user ? <li className="nav-item nav-link">Logged in as: {user.username}</li> : '' }
						<li className='nav-item'>
							{ !user ? <NavLink to='/login' className='nav-link'>Login</NavLink> : <a href="#" className='nav-link' onClick={this.handleLogout}>Logout</a>}
							
						</li>
					</ul>
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