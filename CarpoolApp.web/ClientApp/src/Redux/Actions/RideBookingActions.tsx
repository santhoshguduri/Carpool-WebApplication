import { SEARCH_AVAILABLE_RIDES_SUCCESS, SEARCH_AVAILABLE_RIDES_FAILURE, FETCH_BOOKING_REQUESTS_SUCCESS, FETCH_BOOKING_REQUESTS_FAILURE, FETCH_BOOKING_SUCCESS, FETCH_BOOKING_FAILURE, FETCH_ALL_BOOKINGS_SUCCESS, FETCH_ALL_BOOKINGS_FAILURE } from "../ActionTypes/RideBookingActiontypes"
import { IBooking } from "../../Components/Shared/SharedContracts"

export const searchRideSInitialState : ISearchRideSInitialState =
{
    rides:[],
    ride:{},
    error:''
}

export interface ISearchRideSInitialState {
    rides : Array<IBooking>,
    ride : object,
    error : string
}

export interface ISearchRidesSuccess {
    type : string,
    payload : Array<IBooking>
}

export interface IFailure {
    type : string,
    payload : string
}

export interface IFetchBookingSuccess {
    type : string,
    payload : object
}

export interface IFetchAllBookingsSuccess {
    type : string,
    payload : Array<IBooking>
}

export interface IFetchBookingRequestsSuccess {
    type : string,
    payload : Array<IBooking>
}

export const searchRidesSuccess = (data : Array<IBooking>) : ISearchRidesSuccess =>{
    return{
        type:SEARCH_AVAILABLE_RIDES_SUCCESS,
        payload:[...data]
    }
}

export const searchRidesFailure = (data : string) : IFailure =>{
    return{
        type:SEARCH_AVAILABLE_RIDES_FAILURE,
        payload:data
    }
}

export const fetchBookingSuccess = (data : object) : IFetchBookingSuccess =>{
    return{
        type:FETCH_BOOKING_SUCCESS,
        payload:data
    }
}

export const fetchBookingFailure = (data : string) : IFailure =>{
    return{
        type:FETCH_BOOKING_FAILURE,
        payload:data
    }
}

export const fetchAllBookingsSuccess = (data : Array<IBooking>) : IFetchAllBookingsSuccess =>{
    return{
        type:FETCH_ALL_BOOKINGS_SUCCESS,
        payload:[...data]
    }
}

export const fetchAllBookingsFailure = (data : string) : IFailure =>{
    return{
        type:FETCH_ALL_BOOKINGS_FAILURE,
        payload:data
    }
}

export const fetchBookingRequestsSuccess = (data : Array<IBooking>) : IFetchBookingRequestsSuccess =>{
    return{
        type:FETCH_BOOKING_REQUESTS_SUCCESS,
        payload:[...data]
    }
}

export const fetchBookingRequestsFailure = (data : string) : IFailure=>{
    return{
        type:FETCH_BOOKING_REQUESTS_FAILURE,
        payload:data
    }
}