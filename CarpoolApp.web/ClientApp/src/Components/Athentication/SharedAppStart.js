import React, { useContext } from 'react';
import AppStartBackground from '../../Assests/Static Files/img1.png'
import Signup from './Signup'
import Login from './Login'

import {UserContext} from "../../Store/Context/UserContext";
 
function AppStart() {

    const userContext = useContext(UserContext);
        
        return(
            <div className="signup-page">
                <div id="signup-page-left">
                <div id="pickup-line">
                    <h1 className="header">TURN <span id="miles-text">MILES</span></h1>
                    <h1 className="header"> INTO <span id="money-text">MONEY</span></h1>
                    <h2 id="tagline" >RIDES ON TAP</h2>
                </div>
                <img id="signup-background" src={AppStartBackground} alt="signup-background"/>
                </div>
                {
                    userContext.userState.isLoginRendered?
                    <Login ></Login>:
                    <Signup ></Signup>
                }
            </div>
        );
}


export default AppStart;