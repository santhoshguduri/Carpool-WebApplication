import { checkCarPresentSuccess, checkCarPresentFailure, createCarSuccess, createCarFailure } from "../Actions/CarActions";
import { Dispatch } from "redux";
import {ICar} from '../../Components/Car/Car'


export const CheckIfUserCarRegistered =(id : number) => {
    return function(dispatch : Dispatch){
        fetch('https://localhost:44304/cars/checkifownscar/'+id,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')!).token}
    })
    .then(response =>{
        return response.json();
    })
        .then(response => {
            console.log(response);
            dispatch(checkCarPresentSuccess(response));
            sessionStorage.setItem('carId', JSON.stringify(response));
        })
        .catch(error=>{
            console.log(error);
            dispatch(checkCarPresentFailure(error));
        });
        
    }
}


export const RegisterCar =(car : ICar) => {
    return function(dispatch : Dispatch<any>){
        fetch('https://localhost:44304/cars/createcar/'+JSON.parse(sessionStorage.getItem('authorized')!).userId,{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')!).token},
            body : JSON.stringify(car)})
        .then(response => {
            console.log(response);
            dispatch(createCarSuccess(response));
            sessionStorage.removeItem('isCarRegistered');
            sessionStorage.setItem('isCarRegistered',JSON.stringify(true));
            window.location.href='/bookride';
        })
        .catch(error=>{
            console.log(error);
            dispatch(createCarFailure(error));
        });
    }
}