import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isLogin } from '../utils';

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to home page
        <Route {...rest} element={props => (
            isLogin() ?
                <Component {...props} />
            : <Navigate to="/" />
        )} />
    );
};
