import React from 'react';
import Form from './Form';
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends React.Component {

	componentDidMount() {
		const { onLoad } = this.props;
		axios.get('http://localhost:8080/api/user')
			.then((res) => onLoad(res.data))

	}

	handleDelete(id) {
		const { onDelete } = this.props;
		axios.delete(`http://localhost:8080/api/user/${id}`)
				.then((res) => onDelete(id))
	}

	render() {

		const { users } = this.props;
		return (
			<div id="signup">
				<Form />
				<div className='container mt-4'>
				<ul className='list-group'>
				{users.map((user) => {
					return (<li className='list-group-item d-flex justify-content-between align-items-center' key={user._id}>
						{user.username || 'UNDEFINED'}
						<button onClick={() => this.handleDelete(user._id)} className='btn btn-sm pull-right btn-danger'>Delete</button>
					</li>)
				})}
				</ul>
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	users: state.user.users
})

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'USERS_LOADED', data }),
	onDelete: id => dispatch({type: 'USERS_DELETE', id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);