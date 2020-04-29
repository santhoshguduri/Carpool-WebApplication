import {CHECK_CAR_PRESENT_SUCCESS} from '../ActionTypes/CarActionTypes';
import {CHECK_CAR_PRESENT_FAILURE} from '../ActionTypes/CarActionTypes';
import {CREATE_CAR_SUCCESS} from '../ActionTypes/CarActionTypes';
import {CREATE_CAR_FAILURE} from '../ActionTypes/CarActionTypes';

export const carInitialState = {
    isPresent : false,
    error:''
}

export const checkCarPresentSuccess = data =>{
    return{
        type:CHECK_CAR_PRESENT_SUCCESS,
        payload:data
    }
}

export const checkCarPresentFailure = data =>{
    return{
        type:CHECK_CAR_PRESENT_FAILURE,
        payload:data
    }
}

export const createCarSuccess = data =>{
    return{
        type:CREATE_CAR_SUCCESS,
        payload:data
    }
}

export const createCarFailure = data =>{
    return{
        type:CREATE_CAR_FAILURE,
        payload:data
    }
}