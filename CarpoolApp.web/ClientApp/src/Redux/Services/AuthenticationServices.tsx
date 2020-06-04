import {userAutenticationSuccess} from '../Actions/AuthenticationActions';
import {userAutenticationFailure} from '../Actions/AuthenticationActions';
import {toggleSignupLogin} from '../Actions/AuthenticationActions'
import { Dispatch } from 'redux';

export const AuthenticateUser =(userName : string,password : string) => {
    return function(dispatch : Dispatch){
        fetch('https://localhost:44304/users/authenticate?username='+userName+'&password='+password,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' }
    })
    .then(res => {
        return res.json();
    })
        .then(response => {
            console.log(response);
            dispatch(userAutenticationSuccess(response));
            sessionStorage.setItem('authorized',JSON.stringify(response));
            window.location.replace('/home');
        })
        .catch(error=>{
            dispatch(userAutenticationFailure(error));
            console.log(error);
        });
    }
}

export const toggle=(data : boolean)=>{
    return function(dispatch : Dispatch){
        dispatch(toggleSignupLogin(data));
    }
}

export const getLastActionsId =() => {
    return function(dispatch : Dispatch){
        fetch('https://localhost:44304/users/getlastactionskeys/'+JSON.parse(sessionStorage.getItem('authorized')!).userId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')!).token}
        })
        .then(response=>{
            return response.json();
        })
        .then(response=>{
            console.log(response);
            sessionStorage.setItem('lastActions',JSON.stringify(response));
        })
        .catch(error=>{
            console.log(error);
        });
    }
}