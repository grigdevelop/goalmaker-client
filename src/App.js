import React, { Component } from 'react';
import { Route } from "react-router";
import Login from './components/account/login';
import Goals from "./components/goals/goals";
import PrivateRoute from './components/auth/privateRoute';

class App extends Component {

  

  render() {
    return (
      <div>
        <Route exact path="/" component={Login}/>
        <PrivateRoute path="/goals" component={Goals} />
      </div>
    );
  }

}

export default App;
