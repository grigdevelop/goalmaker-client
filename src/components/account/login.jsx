import React, { Component } from "react";
import { accountService } from "./../../services";
import { Redirect } from "react-router-dom";
import { Formik } from 'formik';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      redirectToReferrer: false,
      loginData: { username: '', password: '' }
    };
  }

  renderForm = () => {
    return (
      <Formik
        initialValues={this.state.loginData}
        validate={this.loginFormValidate}
        onSubmit={this.loginFormSubmit}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" className="form-control"
                onChange={handleChange} value={values.username} onBlur={handleBlur} />
              {errors.username && touched.username && errors.username}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" className="form-control"
                onChange={handleChange} value={values.password} onBlur={handleBlur} />
              {errors.password && touched.password && errors.password}
            </div>
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              Login
            </button>
            {this.state.message}
          </form>
        )}
      </Formik>
    );
  }

  loginFormValidate = (values) => {
    let errors = {};

    if (!values.username) {
      errors.username = "Username can't be empty.";
    }

    if (!values.password) {
      errors.password = "Password can't be empty."
    }

    return errors;
  }

  loginFormSubmit = async (values, { setSubmitting }) => {

      try {
        let user = await accountService.Login(values.username, values.password);

        if (user) {
          this.setState({
            message: "Success logged in"
          });

          accountService.AuthorizeUser(user);
          this.setState({ redirectToReferrer: true });
        } else {
          throw new Error("Username or password invalid.");
        }
      } catch (error) {
        this.setState({
          message: error.message
        });
      }

      setSubmitting(false);
  }

  render() {
    const { from } = this.props.location.state || {
      from: { pathname: "/goals" }
    };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="row">
        <div className="col-md-12">
          {this.renderForm()}
        </div>
      </div>
    );
  }
}

export default Login;
