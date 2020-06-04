import {USER_AUTHENTICATION_SUCCESS} from '../ActionTypes/AuthenticationActionTypes';
import {USER_AUTHENTICATION_FAILURE} from '../ActionTypes/AuthenticationActionTypes';
import {TOGGLE_LOGIN_SIGNUP} from '../ActionTypes/AuthenticationActionTypes';


export const AuthenticateTokenInitialState : IAuthenticateTokenInitialState = {
    user:{
        userId:'',
        name : '',
        token:''
    },
    error:'',
    isAuthenticated:false
}

export const toggleInitialState : IToggleInitialState =
{
    isLoginRendered : true
}

export interface IToggleInitialState {
    isLoginRendered : boolean
}

export interface IAuthenticateTokenInitialState{
    user:{
        userId : string,
        name : string,
        token : string
    }
    error : string,
    isAuthenticated : boolean
}

export interface IUserAutenticationSuccess {
    type : string , 
    payload : IAuthenticateTokenInitialState
}

export interface IUserAutenticationFailure {
    type : string , 
    payload : string
}

export interface IToggleSignupLogin {
    type : string, 
    payload : boolean
}

export const userAutenticationSuccess = (data : IAuthenticateTokenInitialState) : IUserAutenticationSuccess =>{
    return{
        type:USER_AUTHENTICATION_SUCCESS,
        payload:data
    }
}

export const userAutenticationFailure = (data : string) : IUserAutenticationFailure =>{
    return{
        type:USER_AUTHENTICATION_FAILURE,
        payload:data
    }
}

export const toggleSignupLogin = (data : boolean) :IToggleSignupLogin =>{
    return{
        type:TOGGLE_LOGIN_SIGNUP,
        payload:data
    }
}
