import { offerRideSuccess, fetchAllRidesOfferedSuccess, failure } from "../Store/Actions/OfferRideActions";


export const CreateRideOffer =(rideOffer,dispatch) => {
        fetch('https://localhost:44304/offerrides/createride/'+JSON.parse(sessionStorage.getItem('authorized')).userId,{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token},
        body: JSON.stringify(rideOffer)})
        .then(response =>{
            dispatch(offerRideSuccess(response))
            window.location.href='/home';
        })
        .catch(error=>{
            dispatch(failure(error))
            console.log(error);
        });
}

export const getAllRidesOffered =(dispatch) => {
        fetch('https://localhost:44304/offerrides/getallridesoffered/'+JSON.parse(sessionStorage.getItem('authorized')).userId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token},
        })
        .then(response =>{
            return response.json();
        })
        .then(response=>{
            console.log(response);
            dispatch(fetchAllRidesOfferedSuccess(response));
        })
        .catch(error=>{
            dispatch(failure(error));
            console.log(error);
        });
}