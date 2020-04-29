import { SEARCH_AVAILABLE_RIDES_SUCCESS, SEARCH_AVAILABLE_RIDES_FAILURE, FETCH_BOOKING_REQUESTS_SUCCESS, FETCH_BOOKING_REQUESTS_FAILURE, FETCH_BOOKING_SUCCESS, FETCH_BOOKING_FAILURE, FETCH_ALL_BOOKINGS_SUCCESS, FETCH_ALL_BOOKINGS_FAILURE } from "../ActionTypes/RideBookingActiontypes"

export const searchRideSInitialState =
{
    rides:[],
    ride:{},
    error:''
}

export const searchRidesSuccess = data =>{
    return{
        type:SEARCH_AVAILABLE_RIDES_SUCCESS,
        payload:[...data]
    }
}

export const searchRidesFailure =data =>{
    return{
        type:SEARCH_AVAILABLE_RIDES_FAILURE,
        payload:data
    }
}

export const fetchBookingSuccess = data =>{
    return{
        type:FETCH_BOOKING_SUCCESS,
        payload:data
    }
}

export const fetchBookingFailure =data =>{
    return{
        type:FETCH_BOOKING_FAILURE,
        payload:data
    }
}

export const fetchAllBookingsSuccess = data =>{
    return{
        type:FETCH_ALL_BOOKINGS_SUCCESS,
        payload:[...data]
    }
}

export const fetchAllBookingsFailure =data =>{
    return{
        type:FETCH_ALL_BOOKINGS_FAILURE,
        payload:data
    }
}

export const fetchBookingRequestsSuccess = data =>{
    return{
        type:FETCH_BOOKING_REQUESTS_SUCCESS,
        payload:data
    }
}

export const fetchBookingRequestsFailure =data =>{
    return{
        type:FETCH_BOOKING_REQUESTS_FAILURE,
        payload:data
    }
}