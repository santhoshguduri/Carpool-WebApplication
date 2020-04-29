import { rideOfferInitialState } from "../Actions/OfferRideActions"
import { CREATE_RIDE_OFFER_SUCCESS, CREATE_RIDE_OFFER_FAILURE, FETCH_ALL_RIDE_OFFERS_SUCCESS, FETCH_ALL_RIDE_OFFERS_FAILURE } from "../ActionTypes/RideOfferingActionTypes"

export const RideOfferingReducer = (state=rideOfferInitialState,action)=>{
    switch(action.type){
        case CREATE_RIDE_OFFER_SUCCESS:
            return{
                lastRideOfferedId:action.payload
            }
        case CREATE_RIDE_OFFER_FAILURE:
            return{
                lastRideOfferedId:'',
                error : action.payload
            }
        default:
            return state
    }
}

export const fetchAllRidesOfferedReducer = (state=rideOfferInitialState,action)=>{
    switch(action.type){
        case FETCH_ALL_RIDE_OFFERS_SUCCESS:
            return{
                rides:[...action.payload],
                error:''
            }
        case FETCH_ALL_RIDE_OFFERS_FAILURE:
            return{
                rides:[],
                error : action.payload
            }
        default:
            return state
    }
}