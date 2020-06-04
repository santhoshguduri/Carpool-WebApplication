import {CREATE_USER_SUCCESS} from '../ActionTypes/UserActionTypes';
import {CREATE_USER_FAILURE} from '../ActionTypes/UserActionTypes';


export const CreateUserSuccess = (data : any) =>{
    return{
        type:CREATE_USER_SUCCESS,
        payload:data
    }
}

export const CreateUserFailure = (data : string) =>{
    return{
        type:CREATE_USER_FAILURE,
        payload:data
    }
}

