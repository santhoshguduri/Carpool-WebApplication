import React, { Component } from 'react';
import user from '../../Assests/Static Files/user.jfif';

class MatchedUser extends Component{

 

    render(){
        return(
            <div className="userCard">
                <div>
                <h2>{this.props.ride.name}</h2>
                <img className="cardUserImage" src={user} alt="user"/>
                </div>
                <div className="left-alligned-details">
                <h5>From</h5>
                <p>{this.props.ride.startPoint}</p>
                <h5>Date</h5>
                <p>{this.props.ride.rideBookingDate}</p>
                <h5>Price</h5>
                <p>Rs.{this.props.ride.rideFair}</p>
                </div>
                
                <div className="right-alligned-details">
                <h5>To</h5>
                <p>{this.props.ride.destination}</p>
                <h5>Time</h5>
                <p>{this.props.ride.time}</p>
                <h5>Seat Availability</h5>
                <p>{this.props.ride.seats}</p>
                </div>
                <div className="route">
                        <i class="fas fa left-point fa-circle"></i>
                        <i class="fas fa center fa-circle"></i>
                        <i class="fas fa center fa-circle"></i>
                        <i class="fas fa center fa-circle"></i>
                        <i class="fas fa center fa-circle"></i>
                        <i class="fas fa right-point fa-map-marker"></i>
                        </div>
                </div>
        )
    }
}
export default MatchedUser;