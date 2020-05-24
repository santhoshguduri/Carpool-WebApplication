import {userAutenticationSuccess} from '../Store/Actions/AuthenticationActions';
import {userAutenticationFailure} from '../Store/Actions/AuthenticationActions';
import {toggleSignupLogin} from '../Store/Actions/AuthenticationActions'
import { useContext } from 'react';
import { UserContext } from '../Store/Context/UserContext';



export const AuthenticateUser =(userName,password,userContext) => {
        fetch('https://localhost:44304/users/authenticate?username='+userName+'&password='+password,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' }
    })
    .then(res => {
        return res.json();
    })
        .then(response => {
            console.log(response);
            userContext.userDispatch(userAutenticationSuccess(response));
            sessionStorage.setItem('authorized',JSON.stringify(response));
            window.location.replace('/home');
        })
        .catch(error=>{
            userContext.userDispatch(userAutenticationFailure(error));
            console.log(error);
        });
}

export const toggle=(data)=>{
    return function(dispatch){
        dispatch(toggleSignupLogin(data));
    }
}

export const getLastActionsId =() => {
        fetch('https://localhost:44304/users/getlastactionskeys/'+JSON.parse(sessionStorage.getItem('authorized')).userId,{method: 'get',
        headers: {  "accept":"application/json",
            'Content-Type': 'application/json' ,
            'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('authorized')).token}
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