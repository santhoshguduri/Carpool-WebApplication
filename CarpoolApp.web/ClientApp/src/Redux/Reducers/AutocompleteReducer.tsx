import { autocompleteInitialState, IAutocompleteInitialState, IAutocompleteFromSuccess, IFailure, IAutocompleteToSuccess, IAutocompleteCheckpointSuccess, IAutocompleteViapointSuccess } from "../Actions/AutocompleteActions"
import { FROM_AUTO_COMPLETE_SUCCESS, FROM_AUTO_COMPLETE_FAILURE, TO_AUTO_COMPLETE_SUCCESS, TO_AUTO_COMPLETE_FAILURE, VIAPOINT_AUTO_COMPLETE_SUCCESS, VIAPOINT_AUTO_COMPLETE_FAILURE, CHECKPOINT_AUTO_COMPLETE_SUCCESS, CHECKPOINT_AUTO_COMPLETE_FAILURE } from "../ActionTypes/AutocompleteActionTypes"

export const fromAutoCompleteReducer = (state : IAutocompleteInitialState=autocompleteInitialState,action : IAutocompleteFromSuccess | IFailure )=>{
    switch(action.type){
        case FROM_AUTO_COMPLETE_SUCCESS:
            return{
                place : action.payload,
                error :''
            }
        case FROM_AUTO_COMPLETE_FAILURE:
            return{
                place : '',
                error : action.payload
            }
        default:
            return state
    }
}

export const toAutoCompleteReducer = (state : IAutocompleteInitialState=autocompleteInitialState,action : IAutocompleteToSuccess | IFailure )=>{
    switch(action.type){
        case TO_AUTO_COMPLETE_SUCCESS:
            return{
                place : action.payload,
                error :''
            }
        case TO_AUTO_COMPLETE_FAILURE:
            return{
                place : '',
                error : action.payload
            }
        default:
            return state
    }
}

export const checkpointAutoCompleteReducer = (state : IAutocompleteInitialState=autocompleteInitialState,action : IAutocompleteCheckpointSuccess  )=>{
    switch(action.type){
        case CHECKPOINT_AUTO_COMPLETE_SUCCESS:
            return{
                place : action.payload.place,
                index : action.payload.index,
                error :''
            }
        case CHECKPOINT_AUTO_COMPLETE_FAILURE:
            return{
                place : '',
                error : "Something went wrong"
            }
        default:
            return state
    }
}

export const viaPointAutoCompleteReducer = (state : IAutocompleteInitialState=autocompleteInitialState,action : IAutocompleteViapointSuccess | IFailure )=>{
    switch(action.type){
        case VIAPOINT_AUTO_COMPLETE_SUCCESS:
            return{
                places : action.payload,
                error :''
            }
        case VIAPOINT_AUTO_COMPLETE_FAILURE:
            return{
                places : [],
                error : action.payload
            }
        default:
            return state
    }
}