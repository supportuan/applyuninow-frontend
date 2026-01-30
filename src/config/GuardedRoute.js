import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { authenticationService } from './auth.service';

const GuardedRoute = ({ component: Component, auth, ...rest }) => {
    if(authenticationService.currentUserValue){
        auth = true
    }else{
        auth = false
    }
    return(
        <Route {...rest} render={(props) => (
            auth === true
                ? <Component {...props} />
                : <Redirect to='/' />
        )} />
    )
}

export default GuardedRoute;