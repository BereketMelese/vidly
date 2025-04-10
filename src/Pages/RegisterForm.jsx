import React from "react";
import Joi from "joi";
import "./loginForm.css";
import Form from "../components/common/Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    username: Joi.string().required().label("Username"),
  };

  doSubmit = () => {
    //call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Register</div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "email", true)}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderInput("username", "Username", "text")}
                  {this.renderButton("Register")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
