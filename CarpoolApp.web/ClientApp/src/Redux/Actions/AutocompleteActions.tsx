import {FROM_AUTO_COMPLETE_SUCCESS, FROM_AUTO_COMPLETE_FAILURE, TO_AUTO_COMPLETE_SUCCESS, TO_AUTO_COMPLETE_FAILURE, VIAPOINT_AUTO_COMPLETE_SUCCESS, VIAPOINT_AUTO_COMPLETE_FAILURE, CHECKPOINT_AUTO_COMPLETE_SUCCESS, CHECKPOINT_AUTO_COMPLETE_FAILURE} from '../ActionTypes/AutocompleteActionTypes';
import { IBooking } from '../../Components/Shared/SharedContracts';

export const autocompleteInitialState : IAutocompleteInitialState = {
    places: [""],
    place:'',
    error:'',
    index : 0
}

export interface IAutocompleteInitialState {
    places :Array<string>,
    place : string,
    error : string,
    index : number
}

export interface IAutocompleteFromSuccess {
    type: string, 
    payload: string
}

export interface IFailure{
    type: string, 
    payload: string
}

export interface IAutocompleteToSuccess{
    type: string, 
    payload: string
}

export interface IAutocompleteViapointSuccess{
    type: string, 
    payload: IBooking[]
}

export interface IAutocompleteCheckpointSuccess{
    type: string, 
    payload: {place : string, 
        index : number}
}

export const autocompleteFromSuccess = (data : string) : IAutocompleteFromSuccess =>{
    return{
        type:FROM_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteFromFailure = (data : string) : IFailure=>{
    return{
        type:FROM_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}

export const autocompleteToSuccess = (data : string): IAutocompleteToSuccess =>{
    return{
        type:TO_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteToFailure = (data : string) :IFailure =>{
    return{
        type:TO_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}

export const autocompleteViapointSuccess = (data : Array<IBooking>) : IAutocompleteViapointSuccess =>{
    return{
        type:VIAPOINT_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteViapointFailure = (data : string) : IFailure =>{
    return{
        type:VIAPOINT_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}

export const autocompleteCheckpointSuccess = (data : {place : string, index : number}) : IAutocompleteCheckpointSuccess =>{
    return{
        type:CHECKPOINT_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteCheckpointFailure = (data : string) : IFailure =>{
    return{
        type:CHECKPOINT_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}