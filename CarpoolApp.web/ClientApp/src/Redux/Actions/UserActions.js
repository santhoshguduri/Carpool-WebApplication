
import {CREATE_USER_SUCCESS} from '../ActionTypes/UserActionTypes';
import {CREATE_USER_FAILURE} from '../ActionTypes/UserActionTypes';



const CreateUserSuccess = data =>{
    return{
        type:CREATE_USER_SUCCESS,
        payload:data
    }
}

const CreateUserFailure = data =>{
    return{
        type:CREATE_USER_FAILURE,
        payload:data
    }
}

