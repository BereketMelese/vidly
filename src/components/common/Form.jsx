import React, { Component } from "react";
import Joi from "joi";
import Input from "./Input";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(data, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.schema[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <div className="form-group mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          name={name}
          id={name}
          value={data[name]}
          onChange={this.handleChange}
          className="form-control"
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
        {errors[name] && <div className="alert-dan">{errors[name]}</div>}
      </div>
    );
  }

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        type="submit"
        className="btn login-btn"
      >
        {label}
      </button>
    );
  }

  renderInput(name, label, autoFocus = false) {
    const { data, errors } = this.state;
    return (
      <Input
        autoFocus={autoFocus}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
