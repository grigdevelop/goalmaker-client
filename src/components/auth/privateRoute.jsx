import React from 'react';
import {Route, Redirect } from "react-router-dom";
import { accountService } from './../../services';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        (accountService.IsAuthenticated()) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );

  export default PrivateRoute;