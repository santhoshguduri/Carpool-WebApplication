import { carInitialState } from "../Actions/CarActions";
import { CHECK_CAR_PRESENT_SUCCESS, CHECK_CAR_PRESENT_FAILURE, CREATE_CAR_SUCCESS, CREATE_CAR_FAILURE } from "../ActionTypes/CarActionTypes";

export const checkCarPresentReducer = (state = carInitialState,action) =>{
    switch(action.type){
        case CHECK_CAR_PRESENT_SUCCESS:
            return{
                isPresent : action.payload,
                error :''
            }
        case CHECK_CAR_PRESENT_FAILURE:
            return{
                isPresent : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const createCarReducer = (state = carInitialState,action) =>{
    switch(action.type){
        case CREATE_CAR_SUCCESS:
            return{
                isPresent : true,
                error :''
            }
        case CREATE_CAR_FAILURE:
            return{
                isPresent : false,
                error : action.payload
            }
        default:
            return state
    }
}