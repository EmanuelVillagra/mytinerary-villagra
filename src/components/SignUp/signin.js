import React from 'react'
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { Link as LinkRouter } from 'react-router-dom';
import NavBar from '../NavBar';

function SignIn(props) {

	const handleSubmit = (event) => {
		event.preventDefault()
		const logedUser = {
			email: event.target[0].value,
			password: event.target[1].value,
			from: "form-Signin"
		}
		props.signInUser(logedUser)
	}

	return (
<div>
<div className='citiesHeader'>
    <NavBar/>
</div>
		<form onSubmit={handleSubmit}>
			<div className="form-group input-group">
				<div className="input-group-prepend">
					<span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
				</div>
				<input name="email" className="form-control" placeholder="Email address" type="email" />
			</div>
			<div className="form-group input-group">
				<div className="input-group-prepend">
					<span className="input-group-text"> <i className="fa fa-lock"></i> </span>
				</div>
				<input name='password' className="form-control" placeholder="Create password" type="password" />
			</div>

			<div className="form-group">
				<button type="submit" className="btn btn-primary btn-block"> SignIn  </button>
			</div>
			<div className="text-center">Dont Have an account? <LinkRouter to="/SignUp">SignUp</LinkRouter> </div>
		</form>
</div>


	)

}

const mapDispatchToProps = {
	signInUser: userActions.signInUser,

}



export default connect(null, mapDispatchToProps)(SignIn);