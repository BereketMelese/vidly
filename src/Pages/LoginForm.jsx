import React from "react";
import Joi from "joi";
import "./loginForm.css";
import Form from "../components/common/Form";
import * as authService from "../services/authService";
import { useNavigate } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().min(6).required().label("Password"),
  };

  doSubmit = async () => {
    // login the user
    try {
      const { data } = this.state;
      const { email, password } = data;
      await authService.login(email, password);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">Login</div>
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  {this.renderInput("email", "Email", "email", true)}
                  {this.renderInput("password", "Password", "password")}
                  {this.renderButton("Login")}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default function LoginFormWrapper() {
  const navigate = useNavigate();
  return <LoginForm navigate={navigate} />;
}
