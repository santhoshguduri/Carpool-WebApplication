import { checkCarPresentSuccess, createCarSuccess, createCarFailure } from "../Store/Actions/CarActions";


export const CheckIfUserCarRegistered =(id,dispatch) => {
        fetch('https://localhost:44304/cars/checkifownscar/'+id,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
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
        });
}


export const RegisterCar = (car,dispatch) => {
        fetch('https://localhost:44304/cars/createcar',{method: 'post',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token},
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