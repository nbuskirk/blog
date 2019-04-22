import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends React.Component {
		constructor(props){
		super(props);
		this.state = {
			username: '',
			password: ''
		}
		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChangeField(key, event) {
	    this.setState({
	      [key]: event.target.value
	    })
  	}

  	handleSubmit() {

  		const { onSubmit } = this.props;
  		const { username, password } = this.state;

		axios.post('http://localhost:8080/api/user', {
			username,
		    password,
		})
		.then((res) => onSubmit(res.data))
  	}

	render() {
		const { username, password } = this.state;
		return(
			<div className="container">
					
						<div className=" mx-auto card p-5 text-center">
							<h1 className='card-title display-4'>Add User</h1>
							<p className='card-body'>Create a new user with the following details</p>
							<div className='form-group col-lg-6 mx-auto'>
								<form>
								<input required className='form-control p-4 border-bottom-0 rounded-top' type='text' name='username' value={username} placeholder="Username" onChange={(ev) => this.handleChangeField('username',ev)}></input>
								<input required className='form-control p-4 border-top-1 rounded-bottom' type='text' name='password' value={password} placeholder="Password" onChange={(ev) => this.handleChangeField('password',ev)}></input>
								</form>
								<button className='btn btn-primary btn-lg btn-block mt-4' type='button' onClick={this.handleSubmit}>Go</button>
							</div>
						
					</div>
				</div>
		)
	}
}
const mapStateToProps = state => ({
	users: state.user.users
})

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({type: 'USERS_ADD', data}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);