import React,{createContext,useReducer} from 'react'
import { searchRidesInitialState } from "../Actions/RideBookingActions"
import { SEARCH_AVAILABLE_RIDES, FETCH_BOOKING, FETCH_BOOKING_REQUESTS, FETCH_ALL_BOOKINGS, FAILURE } from "../ActionTypes/RideBookingActiontypes"


export const BookingContext = createContext();

const bookingReducer = (state = searchRidesInitialState,action)=>{
    switch(action.type){
        case SEARCH_AVAILABLE_RIDES:
            return{
                ...state,
                rides:[...action.payload],
                error:''
            }
        case FETCH_BOOKING:
            return{
                ...state,
                ride:action.payload,
                error:''
            }
        case FETCH_BOOKING_REQUESTS:
            return{
                ...state,
                rides:[...action.payload],
                error:''
            }
        case FETCH_ALL_BOOKINGS:
            return{
                ...state,
                rides:[...action.payload],
                error:''
            }
        case FAILURE:
            return{
                ...state,
                error : action.payload
            }
        default:
            return state
    }
}


export const BookingProvider = (props) =>{

    const [state, dispatch] = useReducer(bookingReducer, searchRidesInitialState);
    
    return(
        <BookingContext.Provider value={{bookingState : state, bookingDispatch : dispatch }}>
            {props.children}
        </BookingContext.Provider>
    );
}