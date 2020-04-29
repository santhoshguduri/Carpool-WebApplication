import React,{ Component } from "react"
import MatchedUser from '../MatchedUser/MatchedUsers';
import { connect } from "react-redux";
import { getAllBookings } from "../../Redux/Services/RideBookingServices";
import { getAllRidesOffered } from "../../Redux/Services/RideOfferingServices";

class MyRides extends Component{

    componentDidMount(){
        this.props.getAllBookings();
        this.props.getAllOfferedRides();
    }

    render(){
        return(
            <div className="appBackground">
                <div id="bookedRides">
                <p id="bookedRide-header">Booked rides</p>
                {this.props.bookings.map((booking)=>(
                    <MatchedUser ride={booking} />
                ))}
                </div>
                <div id="offeredRides">
                <p id="offeredRide-header">Offered rides</p>
                {this.props.rides.map((ride)=>(
                    <MatchedUser ride={ride}/>
                ))
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps= state =>{
    return{
        bookings:state.fetchAllBookings.rides,
        rides:state.fetchAllRidesOffered.rides
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        getAllBookings : ()=> dispatch(getAllBookings()),
        getAllOfferedRides : ()=>dispatch(getAllRidesOffered())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(MyRides);