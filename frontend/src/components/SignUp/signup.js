import React from "react";
import { connect } from "react-redux";
import userActions from "../../redux/actions/userActions";
import { Link as LinkRouter } from "react-router-dom";
import NavBar from "../NavBar";
import FacebookSignUp from "../FacebookSignUp";
import { useState } from "react";

function SignUp(props) {
  const countries = [
    "unselected",
    "Argentina",
    "Brazil",
    "Colombia",
    "Chile",
    "Uruguay",
  ];

  const [selectCountries, setSelectCountries] = useState("unselected");

  function selected(event) {
    setSelectCountries(event.target.value);
  }
  console.log(props)
  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: event.target[1].value,
      lastName: event.target[2].value,
      email: event.target[3].value,
      password: event.target[4].value,
      from: "form-Signup",
      country: selectCountries,
      userPic: event.target[5].value
    };
    props.signUpUser(userData);
  };
  return (
    <div>
      <div className="citiesHeader">
        <NavBar />
      </div>
      {props.user ? (
        <div>
          <h1>User Connected</h1>
          <h2>
            Back to <LinkRouter to="/">Home</LinkRouter>
          </h2>
        </div>
      ) : (
        <div className="form">
          <h3>Sign Up with</h3>
          <FacebookSignUp />
          <h3>or with</h3>
          <form onSubmit={handleSubmit}>
            <div class="styled-select">
              <select
                class="form-select input form-select-sm"
                aria-label=".form-select-sm example"
                onChange={selected}
              >
                {countries.map((country) => (
                  <option>{country}</option>
                ))}
              </select>
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name="name"
                className="form-control"
                placeholder="First name"
                type="text"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name="lastName"
                className="form-control"
                placeholder="Last name"
                type="text"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-envelope"></i>{" "}
                </span>
              </div>
              <input
                name="email"
                className="form-control"
                placeholder="Email address"
                type="email"
              />
            </div>

            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-lock"></i>{" "}
                </span>
              </div>
              <input
                name="password"
                className="form-control"
                placeholder="Create password"
                type="password"
              />
            </div>
            <div className="form-group input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  {" "}
                  <i className="fa fa-user"></i>{" "}
                </span>
              </div>
              <input
                name="userPic"
                className="form-control"
                placeholder="Image url"
                type="text"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                {" "}
                Create Account{" "}
              </button>
            </div>
            <div className="text-center">
              Have an account? <LinkRouter to="/SignIn">SignIn</LinkRouter>{" "}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
const mapDispatchToProps = {
  signUpUser: userActions.signUpUser,
};
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
