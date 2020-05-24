import {AUTO_COMPLETE_FROM_AREA, AUTO_COMPLETE_TO_AREA, AUTO_COMPLETE_VIAPOINT, AUTO_COMPLETE_CHECKPOINT, FAILURE} from '../ActionTypes/AutocompleteActionTypes';

export const autocompleteInitialState = {
    fromArea:'',
    toArea:'',
    places: [""],
    place:'',
    error:''
}

export const autocompleteFromSuccess = data =>{
    return{
        type:AUTO_COMPLETE_FROM_AREA,
        payload:data
    }
}

export const autocompleteToSuccess = data =>{
    return{
        type:AUTO_COMPLETE_TO_AREA,
        payload:data
    }
}

export const autocompleteViapointSuccess = data =>{
    return{
        type:AUTO_COMPLETE_VIAPOINT,
        payload:data
    }
}

export const autocompleteCheckpointSuccess = data =>{
    return{
        type:AUTO_COMPLETE_CHECKPOINT,
        payload:data
    }
}

export const failure =data =>{
    return{
        type:FAILURE,
        payload:data
    }
}