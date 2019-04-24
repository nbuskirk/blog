import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Form extends React.Component {
	
	constructor(props){
		
		super(props);
		
		this.state = {
			username: '',
			password: '',
			alert: false
		}

		this.handleChangeField = this.handleChangeField.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
	}
	
	toggleAlert(){
		this.setState({
			alert: !this.state.alert
		})
	}

	handleChangeField(key, event) {
		this.setState({
	    	[key]: event.target.value
		})
  	}

  	handleSubmit() {

  		const { onSubmit, onError } = this.props;
  		const { username, password } = this.state;

		axios.post('http://localhost:8080/api/user', {
			username,
		    password,
		})
		.then((res) => {
			if(res.data.code==200) { onSubmit(res.data) }
			else if(res.data.code==204) { 
				this.setState({
					alert: true
				}, () => {
					onError(res.data)
				})
				 
			}
		})
  	
  	}

	render() {
		
		const { error } = this.props;
		const { username, password, alert } = this.state;
		
		return(
			<div className="container">		
				<div className=" mx-auto card p-5 text-center">
					<h1 className='card-title display-4'>Sign Up</h1>
					<p className='card-body'>Create a new user with the following details</p>
					<div className='form-group col-lg-6 mx-auto'>
						<input required className='form-control p-4 border-bottom-0 rounded-top' type='text' name='username' value={username} placeholder="Username" onChange={(ev) => this.handleChangeField('username',ev)}></input>
						<input required className='form-control p-4 border-top-1 rounded-bottom' type='text' name='password' value={password} placeholder="Password" onChange={(ev) => this.handleChangeField('password',ev)}></input>
						{ error && alert ? 
							<div className='alert alert-danger mt-3 fade show out' role='alert'>
								<strong>{error}</strong>
								<button type='button' className='close' onClick={this.toggleAlert}>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div> 
						: null } 
						<button className='btn btn-primary btn-lg btn-block mt-4' type='button' onClick={this.handleSubmit}>Go</button>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	users: state.user.users,
	error: state.user.error
})

const mapDispatchToProps = dispatch => ({
  onSubmit: data => dispatch({type: 'USERS_ADD', data}),
  onError: data => dispatch({type: 'ERROR_SIGNUP', data})
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);