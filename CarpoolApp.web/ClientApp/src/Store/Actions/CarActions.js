import {CHECK_CAR_PRESENT} from '../ActionTypes/CarActionTypes';
import {CREATE_CAR} from '../ActionTypes/CarActionTypes';
import {FAILURE} from '../ActionTypes/CarActionTypes';

export const carInitialState = {
    isPresent : false,
    error:''
}

export const checkCarPresentSuccess = data =>{
    return{
        type:CHECK_CAR_PRESENT,
        payload:data
    }
}

export const createCarSuccess = data =>{
    return{
        type:CREATE_CAR,
        payload:data
    }
}

export const createCarFailure = data =>{
    return{
        type:FAILURE,
        payload:data
    }
}