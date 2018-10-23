import React, { Component } from 'react';
import { Route } from "react-router";
import {Goals, Login} from "./components";
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
