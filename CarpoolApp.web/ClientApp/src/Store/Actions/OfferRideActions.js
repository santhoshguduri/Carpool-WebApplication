import { CREATE_RIDE_OFFER, FETCH_ALL_RIDE_OFFERS, FAILURE } from "../ActionTypes/RideOfferingActionTypes"


export const rideOfferInitialState =
{
    lastRideOfferedId:'',
    rides:[],
    error:''
}

export const offerRideSuccess = data =>{
    return{
        type:CREATE_RIDE_OFFER,
        payload:data
    }
}

export const fetchAllRidesOfferedSuccess = data =>{
    return{
        type:FETCH_ALL_RIDE_OFFERS,
        payload:[...data]
    }
}

export const failure =data =>{
    return{
        type:FAILURE,
        payload:data
    }
}