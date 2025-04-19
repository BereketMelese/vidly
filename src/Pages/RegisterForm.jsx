import React from "react";
import Joi from "joi";
import "./loginForm.css";
import Form from "../components/common/Form";
import { register } from "../services/userService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(6).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      await register(this.state.data).then((response) => {
        console.log("Registration successful", response.data);
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
      console.log("Registration failed", ex.response.data);
    }
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
                  {this.renderInput("name", "Name", "text")}
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
