
import {CREATE_USER} from '../ActionTypes/UserActionTypes';
import {FAILURE} from '../ActionTypes/UserActionTypes';



const CreateUserSuccess = data =>{
    return{
        type:CREATE_USER,
        payload:data
    }
}

const CreateUserFailure = data =>{
    return{
        type:FAILURE,
        payload:data
    }
}

