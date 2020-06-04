import { offerRideSuccess, offerRideFailure, fetchAllRidesOfferedSuccess, fetchAllRidesOfferedFailure } from "../Actions/OfferRideActions";
import { IOfferRide } from "../../Components/OfferRide/OfferRideStops";
import { Dispatch } from "redux";


export const CreateRideOffer =(rideOffer : IOfferRide) => {
    return function(dispatch : Dispatch){
        fetch('https://localhost:44304/offerrides/createride/'+JSON.parse(sessionStorage.getItem('authorized')!).userId,{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')!).token},
        body: JSON.stringify(rideOffer)})
        .then(response =>{
            window.location.href='/home';
        })
        .catch(error=>{
            dispatch(offerRideFailure(error))
            console.log(error);
        });
    }
}

export const getAllRidesOffered =() => {
    return function(dispatch : Dispatch){
        fetch('https://localhost:44304/offerrides/getallridesoffered/'+JSON.parse(sessionStorage.getItem('authorized')!).userId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')!).token},
        })
        .then(response =>{
            return response.json();
        })
        .then(response=>{
            dispatch(fetchAllRidesOfferedSuccess(response));
        })
        .catch(error=>{
            dispatch(fetchAllRidesOfferedFailure(error));
            console.log(error);
        });
    }
}