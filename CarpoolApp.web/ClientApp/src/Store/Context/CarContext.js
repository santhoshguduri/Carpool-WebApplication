import React,{createContext,useReducer} from 'react'
import { carInitialState } from '../Actions/CarActions';
import { CHECK_CAR_PRESENT, CREATE_CAR,FAILURE } from "../ActionTypes/CarActionTypes";


export const CarContext = createContext();

export const carReducer = (state = carInitialState,action) =>{
    switch(action.type){
        case CHECK_CAR_PRESENT:
            return {
                isPresent: action.payload != 0 ? true : false,
                error :''
            }
        case CREATE_CAR:
            return{
                isPresent : true,
                error :''
            }
        case FAILURE:
            return{
                isPresent : false,
                error : action.payload
            }
        default:
            return state
    }
}

export const CarProvider = (props) =>{

    const [state, dispatch] = useReducer(carReducer, carInitialState);

    return(
        <CarContext.Provider value={{carState:state, carDispatch : dispatch}}>
            {props.children}
        </CarContext.Provider>
    );
}