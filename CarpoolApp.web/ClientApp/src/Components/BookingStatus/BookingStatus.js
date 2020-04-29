import React,{ Component } from "react"
import MatchedUser from '../MatchedUser/MatchedUsers';
import { connect } from "react-redux";
import { getBooking } from "../../Redux/Services/RideBookingServices";

class BookingStatus extends Component{

    componentDidMount(){
        this.props.getBooking();
    }

    render(){
        return(
            <div className="appBackground">
                
                <div id="bookedRide">
                {JSON.parse(sessionStorage.getItem('lastActions')).lastBookingId !== 0?<React.Fragment>
                    <h3>Requested Booking</h3>
                <MatchedUser ride={this.props.booking}></MatchedUser><br></br>
                {this.props.booking.status == 3 ?
                    <p id="rideStatus">Booking Request has been placed</p> :
                    this.props.booking.status == 2?
                    <p id="rideStatusRejected">Booking Request has been Rejected</p> :
                    <p id="rideStatusApproved">Booking Request has been Approved</p>}</React.Fragment>
                    : <h4 id="requestsNoneMessage">No Booking Requests has been placed previously</h4>}
                </div> 
            </div>
        )
    }
}

const mapStateToProps= state =>{
    return{
        booking:state.fetchBooking.ride
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getBooking : () => dispatch(getBooking())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookingStatus);