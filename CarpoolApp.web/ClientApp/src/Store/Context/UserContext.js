import React,{createContext, useReducer, useContext} from 'react'
import {USER_AUTHENTICATION_SUCCESS,USER_AUTHENTICATION_FAILURE} from '../ActionTypes/AuthenticationActionTypes';
import { AuthenticateTokenInitialState } from '../Actions/AuthenticationActions';
import {toggleInitialState} from '../Actions/AuthenticationActions';
import {TOGGLE_LOGIN_SIGNUP} from '../ActionTypes/AuthenticationActionTypes';

export const UserContext = createContext();

const userAuthenticationReducer = (state=AuthenticateTokenInitialState,action)=>{
    switch(action.type){
        case USER_AUTHENTICATION_SUCCESS:
            return{
                ...state,
                user : action.payload,
                error :'',
                isAuthenticated : true
            }
        case TOGGLE_LOGIN_SIGNUP:
            return{
                ...state,
                isLoginRendered : action.payload
            }
        case USER_AUTHENTICATION_FAILURE:
            return{
                ...state,
                user : {},
                error : action.payload,
                isAuthenticated : false
            }
        default:
            return state
    }
}

export const UserProvider = (props) =>{

    const [state, dispatch] = useReducer(userAuthenticationReducer, AuthenticateTokenInitialState);
    
    return(
        <UserContext.Provider value={{userState : state, userDispatch : dispatch}}>
            {props.children}
        </UserContext.Provider>
    );
}