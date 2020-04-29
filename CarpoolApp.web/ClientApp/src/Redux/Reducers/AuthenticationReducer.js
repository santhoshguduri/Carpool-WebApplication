import {USER_AUTHENTICATION_SUCCESS} from '../ActionTypes/AuthenticationActionTypes';
import {USER_AUTHENTICATION_FAILURE} from '../ActionTypes/AuthenticationActionTypes';
import { AuthenticateTokenInitialState } from '../Actions/AuthenticationActions';
import {toggleInitialState} from '../Actions/AuthenticationActions';
import {TOGGLE_LOGIN_SIGNUP} from '../ActionTypes/AuthenticationActionTypes';


export const userAuthenticationReducer = (state=AuthenticateTokenInitialState,action)=>{
    switch(action.type){
        case USER_AUTHENTICATION_SUCCESS:
            return{
                user : action.payload,
                error :'',
                isAuthenticated : true
            }
        case USER_AUTHENTICATION_FAILURE:
            return{
                user : '',
                error : action.payload,
                isAuthenticated : false
            }
        default:
            return state
    }
}

export const toggleReducer = (state=toggleInitialState,action)=>{
    switch(action.type){
        case TOGGLE_LOGIN_SIGNUP:
            return{
                isLoginRendered : action.payload
            }
        default:
            return state
    }
}