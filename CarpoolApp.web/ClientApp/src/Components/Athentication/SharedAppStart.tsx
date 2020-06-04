import React, { Component } from 'react';
import appRepresent from '../../Assests/Static Files/img1.png'
import Signup from './Signup'
import Login from './Login';
import {connect, ReactReduxContextValue} from 'react-redux';
import { Action, AnyAction } from 'redux';

interface IProps{
    isLoginDisplayed:boolean
}

interface IState{
    
}

interface StateProps{
    isLoginDisplayed :boolean
}

class AppDescription extends Component<IProps,IState>{


    render(){
        
        return(
            <div className="signup-page">
                <div id="signup-page-left">
                <div id="pickup-line">
                    <h1 className="header">TURN <span id="miles-text">MILES</span></h1>
                    <h1 className="header"> INTO <span id="money-text">MONEY</span></h1>
                    <h2 id="tagline" >RIDES ON TAP</h2>
                </div>
                <img id="signup-background" src={appRepresent} alt="signup-background"/>
                </div>
                {
                    this.props.isLoginDisplayed?
                    <Login ></Login>:
                    <Signup ></Signup>
                }
            </div>
        )
    }
}

const mapStateToProps = (state: any) : StateProps =>{
    return{
        isLoginDisplayed : state.toggle.isLoginRendered
    }
}


export default connect<StateProps>(mapStateToProps)(AppDescription);