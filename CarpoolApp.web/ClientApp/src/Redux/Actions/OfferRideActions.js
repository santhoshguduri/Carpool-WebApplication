import { CREATE_RIDE_OFFER_SUCCESS, CREATE_RIDE_OFFER_FAILURE, FETCH_ALL_RIDE_OFFERS_SUCCESS, FETCH_ALL_RIDE_OFFERS_FAILURE } from "../ActionTypes/RideOfferingActionTypes"


export const rideOfferInitialState =
{
    lastRideOfferedId:'',
    rides:[],
    error:''
}

export const offerRideSuccess = data =>{
    return{
        type:CREATE_RIDE_OFFER_SUCCESS,
        payload:data
    }
}

export const offerRideFailure =data =>{
    return{
        type:CREATE_RIDE_OFFER_FAILURE,
        payload:data
    }
}

export const fetchAllRidesOfferedSuccess = data =>{
    return{
        type:FETCH_ALL_RIDE_OFFERS_SUCCESS,
        payload:[...data]
    }
}

export const fetchAllRidesOfferedFailure =data =>{
    return{
        type:FETCH_ALL_RIDE_OFFERS_FAILURE,
        payload:data
    }
}