import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

function FacebookSignUp(props) {

  const responseFacebook = async (res) => {
    const fullNameSeparado = res.name.split(" ")
    let name = fullNameSeparado[0]
    let lastName = fullNameSeparado[1]
    
    const userData = {
      name:name+" ",
      lastName:lastName,
      email: res.email,
      password: res.id,
      from: "facebook",
      country:props.country
    }
    await props.signUpUser(userData)
  }
  return (
    <FacebookLogin
    cssClass="buttonsocial my-facebook-button-class"
    icon="fa-facebook"
    textButton=" SignUp with Facebook"
      appId="652280925882535"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}

    />
  );
}
const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,

}

export default connect(null, mapDispatchToProps)(FacebookSignUp);