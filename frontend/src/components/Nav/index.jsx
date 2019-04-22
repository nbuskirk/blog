import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Nav extends React.Component {

	componentDidMount() {
		const { user, onLoad } = this.props;
		onLoad(user)
	}
	render(){

		const { user } = this.props;

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
						<li className='nav-item'>
							{ !user ? <NavLink to='/login' className='nav-link'>Login</NavLink> : <NavLink to='/logout' className='nav-link'>Logout</NavLink>}
						</li>
					</ul>
				</div>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	user: state.nav.user
})

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'NAV_LOADED', data }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);