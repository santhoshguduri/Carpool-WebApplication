import { SEARCH_AVAILABLE_RIDES, FETCH_BOOKING_REQUESTS, FETCH_BOOKING, FETCH_ALL_BOOKINGS, FAILURE } from "../ActionTypes/RideBookingActiontypes"

export const searchRidesInitialState =
{
    rides:[],
    ride:{},
    error:''
}

export const searchRidesSuccess = data =>{
    return{
        type:SEARCH_AVAILABLE_RIDES,
        payload:[...data]
    }
}

export const fetchBookingSuccess = data =>{
    return{
        type:FETCH_BOOKING,
        payload:data
    }
}

export const fetchAllBookingsSuccess = data =>{
    return{
        type:FETCH_ALL_BOOKINGS,
        payload:[...data]
    }
}

export const fetchBookingRequestsSuccess = data =>{
    return{
        type:FETCH_BOOKING_REQUESTS,
        payload:data
    }
}

export const failure =data =>{
    return{
        type:FAILURE,
        payload:data
    }
}