import React,{createContext,useReducer} from 'react'
import { autocompleteInitialState } from "../Actions/AutocompleteActions"
import { AUTO_COMPLETE_FROM_AREA, AUTO_COMPLETE_TO_AREA, AUTO_COMPLETE_VIAPOINT, AUTO_COMPLETE_CHECKPOINT, FAILURE} from "../ActionTypes/AutocompleteActionTypes"

export const AutocompleteContext = createContext();

const autoCompleteReducer = (state=autocompleteInitialState,action)=>{
    switch(action.type){
        case AUTO_COMPLETE_FROM_AREA:
            return{
                ...state,
                fromArea : action.payload,
                error :''
            }
        case AUTO_COMPLETE_TO_AREA:
            return{
                ...state,
                toArea : action.payload,
                error :''
            }
        case AUTO_COMPLETE_CHECKPOINT:
            return{
                ...state,
                place : action.payload.place,
                index : action.payload.index,
                error :''
            }
        case AUTO_COMPLETE_VIAPOINT:
            return{
                ...state,
                places : action.payload,
                error :''
            }
        case FAILURE:
            return{
                error : action.payload
            }
        default:
            return state
    }
}


export const AutocompleteProvider = (props) =>{

    const [state, dispatch] = useReducer(autoCompleteReducer, autocompleteInitialState);
    
    return(
        <AutocompleteContext.Provider value={{autocompleteState:state, autocompleteDispatch:dispatch}}>
            {props.children}
        </AutocompleteContext.Provider>
    );
}