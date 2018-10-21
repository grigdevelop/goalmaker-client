import React, { Component } from "react";
import { accountService } from "./../../services";
import { Redirect } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
      redirectToReferrer: false
    };
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
          <form onSubmit={this.handleSubmit}>
            <p>{this.state.message}</p>
            {this.renderUsername()}
            {this.renderPassword()}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  renderUsername = () => {
    return (
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          value={this.state.username}
          onChange={this.handleChange}
          type="text"
          name="username"
          className="form-control"
        />
      </div>
    );
  };

  renderPassword = () => {
    return (
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          value={this.state.password}
          onChange={this.handleChange}
          type="password"
          name="password"
          className="form-control"
        />
      </div>
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      let user = await accountService.Login(
        this.state.username,
        this.state.password
      );
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
  };
}

export default Login;
