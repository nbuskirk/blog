import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';

class Home extends React.Component {

	componentDidMount() {
		const { user, onLoad } = this.props;
		onLoad(user)
	}
	render(){

		const { posts } = this.props;

		return(
			<div className="content">
				<div className='masthead'>
					<h1>Home</h1>
				</div>
			</div>
		)
	}

}

const mapStateToProps = state => ({
	posts: state.blog.posts
})

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'HOME_LOADED', data }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);