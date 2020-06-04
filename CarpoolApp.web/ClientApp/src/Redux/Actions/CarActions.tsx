import {CHECK_CAR_PRESENT_SUCCESS} from '../ActionTypes/CarActionTypes';
import {CHECK_CAR_PRESENT_FAILURE} from '../ActionTypes/CarActionTypes';
import {CREATE_CAR_SUCCESS} from '../ActionTypes/CarActionTypes';
import {CREATE_CAR_FAILURE} from '../ActionTypes/CarActionTypes';

export const carInitialState : ICarInitialState = {
    isPresent : false,
    error:''
}

export interface ICarInitialState {
    isPresent : boolean,
    error : string
}

export interface ICheckCarPresentSuccess {
    type : string,
    payload : number 
}

export interface IFailure {
    type : string,
    payload : string 
}

export interface ICreateCarSuccess {
    type : string,
    payload : any 
}

export const checkCarPresentSuccess = (data : number) : ICheckCarPresentSuccess=>{
    return{
        type:CHECK_CAR_PRESENT_SUCCESS,
        payload:data
    }
}

export const checkCarPresentFailure = (data : string) : IFailure=>{
    return{
        type:CHECK_CAR_PRESENT_FAILURE,
        payload:data
    }
}

export const createCarSuccess = (data : any) : ICreateCarSuccess =>{
    return{
        type:CREATE_CAR_SUCCESS,
        payload:data
    }
}

export const createCarFailure = (data : string) : IFailure =>{
    return{
        type:CREATE_CAR_FAILURE,
        payload:data
    }
}