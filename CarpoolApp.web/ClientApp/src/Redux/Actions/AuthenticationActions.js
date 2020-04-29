import {USER_AUTHENTICATION_SUCCESS} from '../ActionTypes/AuthenticationActionTypes';
import {USER_AUTHENTICATION_FAILURE} from '../ActionTypes/AuthenticationActionTypes';
import {TOGGLE_LOGIN_SIGNUP} from '../ActionTypes/AuthenticationActionTypes';


export const AuthenticateTokenInitialState = {
    user:{
        userId:'',
        name : '',
        token:''
    },
    error:'',
    isAuthenticated:false
}

export const toggleInitialState =
{
    isLoginRendered : true
}

export const userAutenticationSuccess = data =>{
    return{
        type:USER_AUTHENTICATION_SUCCESS,
        payload:data
    }
}

export const userAutenticationFailure = data =>{
    return{
        type:USER_AUTHENTICATION_FAILURE,
        payload:data
    }
}

export const toggleSignupLogin = data =>{
    return{
        type:TOGGLE_LOGIN_SIGNUP,
        payload:data
    }
}
