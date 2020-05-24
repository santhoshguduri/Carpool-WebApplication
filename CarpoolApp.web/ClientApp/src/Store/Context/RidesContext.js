import React,{createContext, useReducer} from 'react'
import { rideOfferInitialState } from '../Actions/OfferRideActions';
import { CREATE_RIDE_OFFER, FETCH_ALL_RIDE_OFFERS, FAILURE } from "../ActionTypes/RideOfferingActionTypes"


export const RideContext = createContext();

export const rideOfferingReducer = (state=rideOfferInitialState,action)=>{
    switch(action.type){
        case CREATE_RIDE_OFFER:
            return{
                ...state,
                lastRideOfferedId:action.payload
            }
        case FETCH_ALL_RIDE_OFFERS:
            return{
                ...state,
                rides:[...action.payload],
                error:''
            }
        case FAILURE:
            return{
                ...state,
                lastRideOfferedId:'',
                error : action.payload
            }
        default:
            return state
    }
}

export const RideProvider = (props) =>{

    const [state, dispatch] = useReducer(rideOfferingReducer, rideOfferInitialState);
    
    return(
        <RideContext.Provider value={{rideState:state, rideDispatch:dispatch}}>
            {props.children}
        </RideContext.Provider>
    );
}