import {FROM_AUTO_COMPLETE_SUCCESS, FROM_AUTO_COMPLETE_FAILURE, TO_AUTO_COMPLETE_SUCCESS, TO_AUTO_COMPLETE_FAILURE, VIAPOINT_AUTO_COMPLETE_SUCCESS, VIAPOINT_AUTO_COMPLETE_FAILURE, CHECKPOINT_AUTO_COMPLETE_SUCCESS, CHECKPOINT_AUTO_COMPLETE_FAILURE} from '../ActionTypes/AutocompleteActionTypes';

export const autocompleteInitialState = {
    places: [""],
    place:'',
    error:''
}

export const autocompleteFromSuccess = data =>{
    return{
        type:FROM_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteFromFailure =data =>{
    return{
        type:FROM_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}

export const autocompleteToSuccess = data =>{
    return{
        type:TO_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteToFailure =data =>{
    return{
        type:TO_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}

export const autocompleteViapointSuccess = data =>{
    return{
        type:VIAPOINT_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteViapointFailure =data =>{
    return{
        type:VIAPOINT_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}

export const autocompleteCheckpointSuccess = data =>{
    return{
        type:CHECKPOINT_AUTO_COMPLETE_SUCCESS,
        payload:data
    }
}

export const autocompleteCheckpointFailure =data =>{
    return{
        type:CHECKPOINT_AUTO_COMPLETE_FAILURE,
        payload:data
    }
}