import React from 'react'
import { connect } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import { Link as LinkRouter } from 'react-router-dom';
import FacebookSignIn from '../FacebookSignIn';
import NavBar from '../NavBar';
import '../../App.css'
function SignIn(props) {

	const handleSubmit = (event) => {
		event.preventDefault()
		const logedUser = {
			email: event.target[0].value,
			password: event.target[1].value,
			from: "form-Signup"
		}
		props.signInUser(logedUser)
	}

	return (
		<div className=''>
<div className='citiesHeader'>
    <NavBar/>
</div>
<article style={{ maxWidth: 400 }}>

<h4 className="card-title mt-3 text-center">User Account</h4>


<p className="divider-text">
	<span className="bg-light"> SignIn</span>
</p>
<FacebookSignIn />
<p className="divider-text">
	<span className="bg-light"> Or</span>
</p>
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
			<div className="text-center">Dont Have an account? <LinkRouter to="/signup">SignUp</LinkRouter> </div>
		</form>
</article>
		</div>

	)

}

const mapDispatchToProps = {
	signInUser: userActions.signInUser,

}



export default connect(null, mapDispatchToProps)(SignIn);