import React,{useEffect, useContext} from 'react';
import {browserHistory} from 'react-router';
import { CheckIfUserCarRegistered } from '../../Services/CarServices';
import { getLastActionsId } from '../../Services/AuthenticationServices';
import { CarContext } from '../../Store/Context/CarContext';


export function Home() {

    const carContext = useContext(CarContext);

    useEffect( () => {
        getLastActionsId()
    },[]);

    useEffect( () => {
        CheckIfUserCarRegistered(JSON.parse(sessionStorage.getItem('authorized')).userId,carContext.carDispatch)
    },[]);

    const handleBookRide= () =>{
        if(sessionStorage.getItem('isBooking') !=null){
            sessionStorage.removeItem('isBooking');
        }
        sessionStorage.setItem('isBooking',JSON.stringify(true));
        window.location.href='/bookride'
    }

    const handleOfferRide = () =>{
        if(sessionStorage.getItem('isBooking') !=null){
            sessionStorage.removeItem('isBooking');
        }
        sessionStorage.setItem('isBooking',JSON.stringify(false));
        if(carContext.carState.isPresent == true){
            window.location.href='/offerride';
        }
        else{
            window.location.href='/vechileregistration';
        }
    }

        return(
            <div id="profile">
                <h2 id="userGreeting">Hey {JSON.parse(sessionStorage.getItem('authorized')).name}!</h2>
                <div id="userOptions">
                <p onClick={handleBookRide} id="bookRide">Book a ride</p>
                <p onClick={handleOfferRide} id="offerRide">Offer a ride</p>
                </div>
            </div>
        )
}
