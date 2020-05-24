import React,{ useEffect, useContext } from "react"
import MatchedUser from '../MatchedUser/MatchedUsers';
import { getBooking } from "../../Services/RideBookingServices";
import { BookingContext } from "../../Store/Context/BookingContext";

function BookingStatus() {

    const bookingContext = useContext(BookingContext)

    useEffect(  ()=>{
        getBooking(bookingContext.bookingDispatch);
    },[]);

        return(
            <div className="appBackground">
                
                <div id="bookedRide">
                {JSON.parse(sessionStorage.getItem('lastActions')).lastBookingId !== 0?<React.Fragment>
                    <h3>Requested Booking</h3>
                <MatchedUser ride={bookingContext.bookingState.ride}></MatchedUser><br></br>
                {bookingContext.bookingState.ride.status == 3 ?
                    <p id="rideStatus">Booking Request has been placed</p> :
                    bookingContext.bookingState.ride.status == 2?
                    <p id="rideStatusRejected">Booking Request has been Rejected</p> :
                    <p id="rideStatusApproved">Booking Request has been Approved</p>}</React.Fragment>
                    : <h4 id="requestsNoneMessage">No Booking Requests has been placed previously</h4>}
                </div> 
            </div>
        )
}

export default BookingStatus;