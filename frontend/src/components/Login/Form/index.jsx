import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class LoginForm extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			username: '',
			password: '',
			alert: false
		}

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeField = this.handleChangeField.bind(this);
		this.toggleAlert = this.toggleAlert.bind(this);
	}

	handleSubmit(){

		const { onLoad, onError } = this.props;
		const { username, password } = this.state;

		axios.post('http://localhost:8080/api/login', {
			username,
		    password,
		})

		/* Check our login response, if we get a 200OK, send the user data to the reducer and redirect */
		.then((res) => {
			if(res.data.code == 200) {
				onLoad(res.data);
				this.props.history.push('/');
			} else if(res.data.code == 204) {
				this.setState({
					alert: true
				}, () => {
					onError(res.data);
				})

				
			}
		})
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

	render() {
		
		const { user, error } = this.props;
		const { username, password, alert } = this.state;
		
		return (
			<div className="container">		
				<div className=" mx-auto card p-5 text-center">
					<h1 className='card-title display-4'>Login</h1>
					<p className='card-body'>Login with the following details</p>
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
	user: state.app.user,
	error: state.app.error
});

const mapDispatchToProps = dispatch => ({
	onLoad: data => dispatch({ type: 'USER_LOGIN', data }),
	onError: data => dispatch({ type: 'ERROR_LOGIN', data })
});

/* withRouter allows the use of this.props.history(redirect) outside the context of Router */
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));