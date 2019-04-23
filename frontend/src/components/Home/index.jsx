import React from 'react';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {

	componentDidMount() {
		const { onLoad } = this.props;
		//axios('http://localhost:8080/api/posts/featured')
		//	.then((res) => onLoad(res.data))
	}
	render(){

		const { user } = this.props;
		console.log(user)
		return(
			<div className="content">
				<div className='masthead'>
					<h1>Home</h1>
					
				</div>
			</div>
		)
	}

}
export default Home;