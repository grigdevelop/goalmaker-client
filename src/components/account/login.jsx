import React, { Component } from 'react';
import { accountService }  from "./../../services";

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
        };
    }

    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={this.handleSubmit}>
                        <p>{this.state.message}</p>
                        {this.renderUsername()}
                        {this.renderPassword()}
                        <button type="submit" className="btn btn-primary">Login</button>
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
                    type="text" name="username" 
                    className="form-control"/>
            </div>
        );
    }

    renderPassword = () => {
        return (
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input 
                    value={this.state.password} 
                    onChange={this.handleChange}
                    type="password" name="password" 
                    className="form-control"/>
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();


        try {
            let user = await accountService.Login(this.state.username, this.state.password);            
            if(user){
                this.setState({
                    message: 'Success logged in'
                });
                this.props.history.push('/goals');
            }
        } catch (error) {
            this.setState({
                message: error.message
            });
        }
    }
}

export default Login;