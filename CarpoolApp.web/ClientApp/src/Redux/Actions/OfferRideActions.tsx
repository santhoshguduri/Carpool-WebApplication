import { CREATE_RIDE_OFFER_SUCCESS, CREATE_RIDE_OFFER_FAILURE, FETCH_ALL_RIDE_OFFERS_SUCCESS, FETCH_ALL_RIDE_OFFERS_FAILURE } from "../ActionTypes/RideOfferingActionTypes"
import { IBooking } from "../../Components/Shared/SharedContracts"


export const rideOfferInitialState : IRideOfferInitialState =
{
    lastRideOfferedId:0,
    rides:[],
    error:''
}

export interface IRideOfferInitialState {
    lastRideOfferedId: number,
    rides:Array<IBooking>,
    error:string
}

export interface IOfferRideSuccess {
    type : string,
    payload : number
}

export interface IFailure {
    type : string,
    payload : string
}

export interface IFetchAllRidesOfferedSuccess {
    type : string,
    payload : Array<IBooking>
}

export const offerRideSuccess = (data : number) : IOfferRideSuccess =>{
    return{
        type:CREATE_RIDE_OFFER_SUCCESS,
        payload:data
    }
}

export const offerRideFailure = (data : string) : IFailure=>{
    return{
        type:CREATE_RIDE_OFFER_FAILURE,
        payload:data
    }
}

export const fetchAllRidesOfferedSuccess = (data : Array<IBooking>) : IFetchAllRidesOfferedSuccess=>{
    return{
        type:FETCH_ALL_RIDE_OFFERS_SUCCESS,
        payload:[...data]
    }
}

export const fetchAllRidesOfferedFailure = (data : string) : IFailure=>{
    return{
        type:FETCH_ALL_RIDE_OFFERS_FAILURE,
        payload:data
    }
}