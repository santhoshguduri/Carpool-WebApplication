import React, { Component } from 'react';
import logo from '../../Assests/Static Files/logo (1).png';
import user from '../../Assests/Static Files/user.jfif';
import { connect } from 'react-redux';

class NavBar extends Component{

    onLogout = () => {
        sessionStorage.clear();
        window.location.reload(false);
    }

    render(){
        let data={};
        if(window.sessionStorage!=null){
            data = JSON.parse(sessionStorage.getItem('authorized'));
        }
        
        return(
            <div id="NavBar">
                <img id="sharedLogo" src={logo} alt="logo"/>
                {data!=null && data.token!=''? (
                <div id="userDetails">
                    <h2>{data.name}</h2>
                    <span className="dropdown">
                    <img className=" dropdown-toggle" type="button" id="img-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={user} alt="user" />
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button onClick={() =>window.location.href='/home'} className="dropdown-item" >Dashboard</button>
                        <button onClick={() =>window.location.href='/bookingstatus'} className="dropdown-item" >Booking Status</button>
                        <button onClick={() =>window.location.href='/bookingrequests'} className="dropdown-item" >Booking Requests</button>
                        <button onClick={() =>window.location.href='/myrides'} className="dropdown-item" >My Rides</button>
                        <button onClick={this.onLogout} className="dropdown-item" >Logout</button>
                    </div>
                    </span>
                </div> ) : (
                    <React.Fragment></React.Fragment>)
                }
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return{
        response : state.authenticate
    }
}

export default connect(mapStateToProps)(NavBar);