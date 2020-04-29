import { searchRideSInitialState } from "../Actions/RideBookingActions"
import { SEARCH_AVAILABLE_RIDES_SUCCESS, SEARCH_AVAILABLE_RIDES_FAILURE, FETCH_BOOKING_SUCCESS, FETCH_BOOKING_FAILURE, FETCH_BOOKING_REQUESTS_SUCCESS, FETCH_BOOKING_REQUESTS_FAILURE, FETCH_ALL_BOOKINGS_SUCCESS, FETCH_ALL_BOOKINGS_FAILURE } from "../ActionTypes/RideBookingActiontypes"

export const searchRidesReducer = (state=searchRideSInitialState,action)=>{
    switch(action.type){
        case SEARCH_AVAILABLE_RIDES_SUCCESS:
            return{
                rides:[...action.payload],
                error:''
            }
        case SEARCH_AVAILABLE_RIDES_FAILURE:
            return{
                rides:[],
                error : action.payload
            }
        default:
            return state
    }
}

export const fetchBookingReducer = (state=searchRideSInitialState,action)=>{
    switch(action.type){
        case FETCH_BOOKING_SUCCESS:
            return{
                ride:action.payload,
                error:''
            }
        case FETCH_BOOKING_FAILURE:
            return{
                ride:{},
                error : action.payload
            }
        default:
            return state
    }
}

export const fetchBookingRequestsReducer = (state=searchRideSInitialState,action)=>{
    switch(action.type){
        case FETCH_BOOKING_REQUESTS_SUCCESS:
            return{
                rides:[...action.payload],
                error:''
            }
        case FETCH_BOOKING_REQUESTS_FAILURE:
            return{
                rides:[],
                error : action.payload
            }
        default:
            return state
    }
}

export const fetchAllBookingsReducer = (state=searchRideSInitialState,action)=>{
    switch(action.type){
        case FETCH_ALL_BOOKINGS_SUCCESS:
            return{
                rides:[...action.payload],
                error:''
            }
        case FETCH_ALL_BOOKINGS_FAILURE:
            return{
                rides:[],
                error : action.payload
            }
        default:
            return state
    }
}