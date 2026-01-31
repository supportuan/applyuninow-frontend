import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogin } from '../utils';

export const PublicRoute = ({component: Component, restricted, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Navigate to="/leads/explore" />
            : <Component {...props} />
        )} />
    );
};
