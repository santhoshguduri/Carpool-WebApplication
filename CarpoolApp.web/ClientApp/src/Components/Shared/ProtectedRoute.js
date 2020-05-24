import React,{ Component } from "react";
import {Redirect} from 'react-router'

export function ProtectedRoute(props) {
    
        const Component = props.component;

        const data = JSON.parse(sessionStorage.getItem('authorized'));

        return data!=null && data.token!=''? (

            <Component/>
        ) : (

        <Redirect to={{pathname:'/'}} />)
}
